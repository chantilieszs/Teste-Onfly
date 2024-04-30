const { Builder } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

export default async function alterarParagrafos() {
  await driver.get(
    "https://guilhermemuller.com.br/ead/html-css-na-pratica/pagina-html-basica"
  );
  try {
    await driver.sleep(3500);
    await driver.executeScript(alterarTextoParagrafos);
  } catch (error) {
    console.error("Ocorreu um erro ao encontrar os elementos <p>:", error);
  }
}

export default function alterarTextoParagrafos() {
  const paragrafos = document.querySelectorAll("p");

  paragrafos.forEach((paragrafo) => {
    paragrafo.textContent = "Texto alterado";
  });
}

alterarParagrafos();