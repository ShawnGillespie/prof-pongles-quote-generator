// const quoteContainer = document.getElementById('quote-container');
const mainContainer = document.getElementById('container-main');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    // quoteContainer.hidden = true;
    mainContainer.hidden = true;
  }

function removeLoadingSpinner () {
      if (!loader.hidden) {
          mainContainer.hidden = false;
        //   quoteContainer.hidden = false;
          loader.hidden = true;
      }
  }

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://boiling-lake-30864.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} https://shawngillespie.github.io/prof-pongles-quote-generator/`;
    
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
