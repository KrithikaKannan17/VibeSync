import axios from 'axios';
import { VisionAPIResponse, VibeProfile } from '../types';

const VISION_API_KEY = ''; // Add your API key here
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

// Vibe categories mapping
const VIBE_KEYWORDS = {
  energetic: ['nightclub', 'dancing', 'crowd', 'party', 'concert', 'festival', 'alcohol', 'celebration'],
  chill: ['sunset', 'beach', 'nature', 'coffee', 'book', 'pet', 'relaxing', 'calm', 'peaceful'],
  romantic: ['couple', 'flowers', 'candlelight', 'heart', 'date', 'wedding', 'love', 'kiss'],
  aesthetic: ['architecture', 'art', 'museum', 'urban', 'fashion', 'design', 'style', 'aesthetic'],
  fitness: ['gym', 'sports', 'running', 'yoga', 'hiking', 'exercise', 'fitness', 'athletic'],
  food: ['restaurant', 'cooking', 'food', 'meal', 'dining', 'brunch', 'dessert', 'drink'],
  travel: ['landmark', 'airplane', 'mountains', 'city', 'vacation', 'tourism', 'adventure', 'explore'],
  nostalgic: ['vintage', 'retro', 'old', 'childhood', 'memories', 'throwback', 'classic'],
};

export const analyzeImage = async (base64Image: string): Promise<VisionAPIResponse> => {
  try {
    const response = await axios.post(
      `${VISION_API_URL}?key=${VISION_API_KEY}`,
      {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 20 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'FACE_DETECTION', maxResults: 5 },
            ],
          },
        ],
      }
    );

    const result = response.data.responses[0];

    return {
      labels: result.labelAnnotations || [],
      objects: result.localizedObjectAnnotations || [],
      colors: result.imagePropertiesAnnotation?.dominantColors?.colors || [],
      faces: result.faceAnnotations || [],
    };
  } catch (error) {
    console.error('Error analyzing image with Vision API:', error);
    throw new Error('Failed to analyze image. Please check your API key and try again.');
  }
};

export const classifyVibe = (visionData: VisionAPIResponse): VibeProfile => {
  const vibeScores: Record<string, number> = {};
  const detectedElements: string[] = [];

  // Score each vibe category based on detected labels and objects
  const allDetections = [
    ...visionData.labels.map(l => ({ text: l.description.toLowerCase(), score: l.score })),
    ...visionData.objects.map(o => ({ text: o.name.toLowerCase(), score: o.score })),
  ];

  // Calculate vibe scores
  Object.entries(VIBE_KEYWORDS).forEach(([vibe, keywords]) => {
    let score = 0;
    allDetections.forEach(detection => {
      keywords.forEach(keyword => {
        if (detection.text.includes(keyword) || keyword.includes(detection.text)) {
          score += detection.score;
          if (!detectedElements.includes(detection.text)) {
            detectedElements.push(detection.text);
          }
        }
      });
    });
    vibeScores[vibe] = score;
  });

  // Get top 2 vibes
  const sortedVibes = Object.entries(vibeScores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0);

  const primary = sortedVibes[0]?.[0] || 'chill';
  const secondary = sortedVibes[1]?.[0] || 'aesthetic';

  // Calculate energy level based on specific keywords
  const energyKeywords = ['energetic', 'party', 'dancing', 'sports', 'active'];
  const calmKeywords = ['calm', 'peaceful', 'relaxing', 'quiet', 'serene'];
  
  let energyLevel = 0.5; // default medium energy
  allDetections.forEach(detection => {
    if (energyKeywords.some(k => detection.text.includes(k))) {
      energyLevel += 0.1;
    }
    if (calmKeywords.some(k => detection.text.includes(k))) {
      energyLevel -= 0.1;
    }
  });
  energyLevel = Math.max(0, Math.min(1, energyLevel));

  // Determine color mood
  const colorMood = determineColorMood(visionData.colors);

  // Calculate confidence based on top score
  const confidence = Math.min(sortedVibes[0]?.[1] || 0.3, 1);

  return {
    primary,
    secondary,
    energyLevel,
    colorMood,
    confidence,
    detectedElements: detectedElements.slice(0, 10),
  };
};

const determineColorMood = (colors: VisionAPIResponse['colors']): VibeProfile['colorMood'] => {
  if (!colors || colors.length === 0) return 'neutral';

  const dominantColor = colors[0].color;
  const { red, green, blue } = dominantColor;

  // Calculate warmth (red/orange tones)
  const warmth = (red - blue) / 255;
  
  // Calculate saturation
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const saturation = max === 0 ? 0 : (max - min) / max;

  if (saturation > 0.6) return 'vibrant';
  if (warmth > 0.2) return 'warm';
  if (warmth < -0.2) return 'cool';
  return 'neutral';
};

export const getManualVibeOptions = () => {
  return Object.keys(VIBE_KEYWORDS);
};
