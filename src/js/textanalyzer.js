// textAnalyzer.js
import axios from 'axios'
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const charCount1 = document.getElementById('charCount1');
    const wordCount1 = document.getElementById('wordCount1');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const spaceCount = document.getElementById('spaceCount');
    const punctuationCount = document.getElementById('punctuationCount');
    const wordDetails = document.getElementById('wordDetails');
    const wordElement = document.getElementById('word');
    const definitionElement = document.getElementById('definition');
    const partOfSpeechElement = document.getElementById('partOfSpeech');
    const synonymsElement = document.getElementById('synonyms');
    const examplesElement = document.getElementById('examples');
    const typeOf = document.getElementById('typeOf');
    const wordModeBtn = document.getElementById('wordModeBtn');
    const paragraphModeBtn = document.getElementById('paragraphModeBtn');

    const wordMetrics = document.getElementById('wordMetrics');

     
    const paragraphMetrics = document.getElementById('paragraphMetrics');

    let mode = 'paragraph'
    switchMode(mode)

    wordModeBtn.addEventListener('click',()=>{
        mode= 'word';
        switchMode('word')
    });

    paragraphModeBtn.addEventListener('click',()=>{
        switchMode('paragraph')
    });

    function switchMode(newMode) {
        reset_varibales()
        mode = newMode;
        updateInputSize();
    }

    function reset_varibales(){
        textInput.value = '';
        charCount.textContent = '0';
        wordCount.textContent = '0';
        charCount1.textContent = '0';
        wordCount1.textContent = '0';
        sentenceCount.textContent = '0';
        paragraphCount.textContent = '0';
        spaceCount.textContent = '0';
        punctuationCount.textContent = '0';

    }
    function updateInputSize() {
      if (mode === 'word') {
        textInput.style.height = '15px';
        wordDetails.style.display = 'block';
        wordMetrics.style.display = 'block';
        paragraphMetrics.style.display = 'none';
      } else {
        textInput.style.height = '300px';
        wordDetails.style.display = 'none';
        wordMetrics.style.display = 'none';
        paragraphMetrics.style.display = 'block';
      }
    }

    textInput.addEventListener('input', updateMetrics);

    async function updateMetrics() {
        const text = textInput.value;
    
        // Update text metrics based on the mode
        console.log(mode);
        if (mode === 'word') {
            charCount1.textContent = text.length === 0 ? '0' : text.length;
            wordCount1.textContent = text.split(/\s+/).filter(word => word.length > 0).length;
        } else {
            charCount.textContent = text.length === 0 ? '0' : text.length;
            wordCount.textContent = text.split(/\s+/).filter(word => word.length > 0).length;
            sentenceCount.textContent = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
            paragraphCount.textContent = text.split(/\n+/).filter(paragraph => paragraph.length > 0).length;
            spaceCount.textContent = text.split(' ').length - 1;
            punctuationCount.textContent = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) || []).length;
        }
    
        // Check if there's a word to get details (in word mode)
        if (mode === 'word' && text.endsWith(' ')) {
          const words = text.split(/\s+/);
          const lastWord = words[words.length - 2].toLowerCase(); 
          await getWordDetails(lastWord);
        }
      }
    let lastWord = '';
     

    async function getWordDetails(word, resultType='everything') 
    {

        let data = ''
        const apiKey = '95f15b977cmsh56c03b6a186c86dp103817jsn106e0e01629b';
        const apiHost = 'wordsapiv1.p.rapidapi.com';
        try{
            const options = {
            method: 'GET',
            url: `https://${apiHost}/words/${word}`,
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost,
                'Accept': 'application/json',
            },
            };
            
            const response = await axios(options);

            
            const data = response.data;

            if (data.results) {
                const result = data.results[0];
                wordDetails.style.display = 'block';
                wordElement.textContent = word;
                definitionElement.textContent = result.definition || 'N/A';
                partOfSpeechElement.textContent = result.partOfSpeech || 'N/A';
                synonymsElement.textContent = result.synonyms ? result.synonyms.join(', ') : 'N/A';
                examplesElement.textContent = result.examples ? result.examples.join(', ') : 'N/A';
                typeOf.textContent = result.typesOf ? result.typesOf.join(', ') : 'N/A';
                } 
            else {
                // Clear details if no results
                wordDetails.style.display = 'none';
                }
        }
        catch (error) {
            console.error('Error in making the request:', error);
        
             
            alert(`Error: Word details not Found`);
            wordDetails.style.display = 'none';
        }
    }
});
