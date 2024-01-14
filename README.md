# Real-time Text Analyzer
This project is a real-time text analyzer that calculates various metrics as the user types a paragraph. Additionally, it utilizes an external API to fetch word details, including definitions, parts of speech, synonyms, types, and examples.

## Requirements
### Requirement 1: Metrics Calculation
The text analyzer calculates the following metrics dynamically in real-time:

- Number of Characters
- Number of Words
- Number of Sentences
- Number of Paragraphs
- Number of Spaces
- Number of Punctuations
### Requirement 2: Word Details Display
The application uses the Words API (https://www.wordsapi.com) to fetch word details. It displays information such as definition, part of speech, synonyms, types, and examples for the entered word. The UI is designed to match the provided Figma design.

## Getting Started
Follow these steps to run the project locally:

1. Clone the repository:

``` bash
git clone https://github.com/your-username/real-time-text-analyzer.git
```
2. Navigate to the project directory:

```bash
cd real-time-text-analyzer
```
3. Open index.html in your preferred web browser.

## Live Demo
Check out the live demo of the Real-time Text Analyzer hosted on [GitHub Pages](https://nssingh-ml.github.io/real_time-Text-Analyzer/).

## Usage
1. Select the "Word Input" or "Paragraph" mode.
2. Start typing in the input area.
3. Observe the real-time updates of the calculated metrics.
4. If in "Word Input" mode, enter a word to fetch its details using the provided API.
## API Configuration
To configure the API, open textanalyzer.js and update the apiKey and apiHost variables with your Words API key and host.

 ```bash
const apiKey = 'YOUR_WORDS_API_KEY';
const apiHost = 'wordsapiv1.p.rapidapi.com';
```
## Contributing
Feel free to contribute to the project by opening issues or creating pull requests.
