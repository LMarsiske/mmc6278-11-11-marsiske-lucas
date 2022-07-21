const getPoemBtn = document.getElementById("get-poem");
const poemEl = document.getElementById("poem");
const poemURL =
  "https://poetrydb.org/random,linecount/1;12/author,title,lines.json";

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe =
  (...fns) =>
  (firstArg) =>
    fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = ([{ title, author, lines }]) => {
  let titleTag = makeTag("h2")(title);

  let byline = pipe(makeTag("em"), makeTag("h3"))(`by ${author}`);

  let stanzas = [];
  let stanza = [];
  lines.forEach((line, index) => {
    if (!line) {
      //if we have an empty line the stanza is over. Add the stanza to the list of stanzas and reset the current stanza to handle the next line
      stanzas.push(stanza);
      stanza = [];
    } else if (index === lines.length - 1) {
      //this is last line of poem
      stanza.push(line); //add final line to final stanza
      stanzas.push(stanza); //add final stanza to list of stanzas
    } else {
      //if we have a valid line and it isn't the last line of the poem, just add it to the current stanza and move on
      stanza.push(line);
    }
  });

  console.log(stanzas);
  let stanzasStr = "";
  stanzas.forEach((stanza) => {
    //each stanza is an **array** of strings
    stanzasStr += makeTag("p")(stanza.join("<br/>"));
  });

  return `${titleTag}${byline}${stanzasStr}`;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};
