# 🌭 Not Hotdog

An AI-powered image classifier that determines whether an image contains a hotdog or not, inspired by the iconic Silicon Valley TV show scene.
https://is-this-hotdog.lovable.app/
## Features

- **AI Image Classification**: Uses Hugging Face Transformers.js for in-browser image recognition
- **Drag & Drop Upload**: Easy file upload with visual feedback
- **Real-time Analysis**: Instant classification results with confidence scores
- **Responsive Design**: Beautiful hotdog-themed UI that works on all devices
- **No Backend Required**: All processing happens in your browser using WebGPU

## How It Works

1. **Upload an Image**: Drag and drop or click to select an image file (PNG, JPG, WebP)
2. **AI Analysis**: The app uses Google's Vision Transformer model to analyze the image
3. **Get Results**: Receive a clear "HOTDOG!" or "NOT HOTDOG" verdict with confidence score

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom hotdog theme
- **Vite** - Lightning-fast build tool
- **Hugging Face Transformers.js** - In-browser AI model execution
- **Shadcn/ui** - Beautiful, accessible UI components

## Getting Started

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. Open the app in your browser
2. Upload an image by dragging and dropping or clicking the upload area
3. Wait for the AI to analyze the image (first load may take a moment to download the model)
4. See the classification result with confidence score
5. Click "Try Another Image" to test more images

## AI Model

The app uses Google's Vision Transformer (ViT) model for image classification. The model runs entirely in your browser using WebGPU for optimal performance, with automatic fallback to CPU if WebGPU is unavailable.

## Deployment

The app can be deployed to any static hosting service:

- **Lovable**: Click Share → Publish in the Lovable editor
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Deploy directly from GitHub
- **GitHub Pages**: Use the built files from `npm run build`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the "Not Hotdog" app from HBO's Silicon Valley
- Built with [Lovable](https://lovable.dev) - AI-powered web development
- AI models provided by [Hugging Face](https://huggingface.co)

---

**Built with ❤️ and AI** • [Edit in Lovable](https://lovable.dev)
