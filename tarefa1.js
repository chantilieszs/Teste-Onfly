const { Builder, By, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

const nome = "Lucas Bueno"
const email = "gelanlucas@email.com"
const telefone = "31991978031"

const cep = "31640510"
const rua = "Rua das Laranjeiras"
const cidade = "Belo Horizonte"
const estado = "Minas Gerais"

const nomeTitular = "Lucas Gabriel"
const numeroCartao = "1254685965326536"
const vencimentoCartao = "02/2028"
const cvvCartao = "822"


async function preencherFormulario() {
  try {
    await driver.get("https://onfly-rpa-forms-62njbv2kbq-uc.a.run.app/");

    await preencherDadosPessoais(nome, email, telefone);
    await preencherDadosEndereco(cep, rua, cidade, estado);
    await preencherDadosCartao(nomeTitular, numeroCartao, vencimentoCartao, cvvCartao);
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  } finally {
    await driver.quit();
  }
}

async function preencherDadosPessoais(nome, email, telefone) {
  try {
    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[1]/input"))
      .sendKeys(nome);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[2]/input"))
      .sendKeys(telefone);
    await driver.sleep(700);

    if(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      await driver.findElement(By.xpath("/html/body/div/div[2]/form/div[1]/div[3]/input")).sendKeys(email);
    } else {
      throw new Error("O email fornecido não é válido.");
    }
    await driver.sleep(700);

    await driver.findElement(By.id("next-btn")).click();
    await driver.sleep(1500);
  } catch (error) {
    console.error("Ocorreu um erro ao preencher os dados pessoais:", error);
  }
}

async function preencherDadosEndereco(cep, rua, cidade, estado) {
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("/html/body/div/div[2]/form/div[2]/div[1]/input")
        ),
        5000
      )
      .sendKeys(cep);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[2]/input"))
      .sendKeys(rua);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[3]/input"))
      .sendKeys(cidade);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[2]/div[4]/input"))
      .sendKeys(estado);
    await driver.sleep(700);

    await driver.findElement(By.id("next-btn")).click();
    await driver.sleep(1500);
  } catch (error) {
    console.error("Ocorreu um erro ao preencher os dados de endereço:", error);
  }
}

async function preencherDadosCartao(nomeTitular, numeroCartao, vencimentoCartao, cvvCartao) {
  try {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("/html/body/div/div[2]/form/div[3]/div[1]/input")
        ),
        5000
      )
      .sendKeys(nomeTitular);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[2]/input"))
      .sendKeys(numeroCartao);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[3]/input"))
      .sendKeys(vencimentoCartao);
    await driver.sleep(700);

    await driver
      .findElement(By.xpath("/html/body/div/div[2]/form/div[3]/div[4]/input"))
      .sendKeys(cvvCartao);
    await driver.sleep(700);

    await driver.findElement(By.id("next-btn")).click();
    await driver.sleep(5000);
  } catch (error) {
    console.error("Ocorreu um erro ao preencher os dados do cartão:", error);
  }
}

preencherFormulario();
