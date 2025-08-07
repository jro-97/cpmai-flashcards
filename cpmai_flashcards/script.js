let cards = [];
let current = 0;

async function loadCards(){
  const res = await fetch('cards.json');
  cards = await res.json();
}

function showCard(){
  const card = cards[current];
  document.getElementById('front').textContent = card.prompt;
  document.getElementById('back').textContent = card.answer;
  document.getElementById('front').classList.remove('hidden');
  document.getElementById('back').classList.add('hidden');
  document.getElementById('progress').textContent = `Card ${current+1} of ${cards.length}`;
}

document.getElementById('flipBtn').addEventListener('click',()=>{
  document.getElementById('front').classList.toggle('hidden');
  document.getElementById('back').classList.toggle('hidden');
});

document.getElementById('nextBtn').addEventListener('click',()=>{
  current = (current+1) % cards.length;
  showCard();
});

document.getElementById('prevBtn').addEventListener('click',()=>{
  current = (current-1 + cards.length) % cards.length;
  showCard();
});

document.getElementById('startBtn').addEventListener('click', async ()=>{
  const domain = document.getElementById('domainSelect').value;
  await loadCards();
  if(domain !== 'all'){
    cards = cards.filter(c=>c.domain === domain);
  }
  if(cards.length===0){
    alert('No cards for selected domain yet!');
    return;
  }
  current = 0;
  document.getElementById('setup').style.display='none';
  document.getElementById('cardArea').classList.remove('hidden');
  showCard();
});