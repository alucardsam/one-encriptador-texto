/* modal */
const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message')
const closeModal = document.querySelector('.close');

/* initial elements */
const blockPicture = document.querySelector('blockquote picture');
const blockTitle = document.querySelector('blockquote p');
const blockSubtitle = document.querySelector('blockquote small');
let title = 'Ningún mensaje fue encontrado';
let subtitle = 'Ingresa el texto que deseas encriptar o desencriptar';

/* logical elements */
const message = document.querySelector('#message');
const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDesencrypt = document.querySelector('#btn-desencrypt');
const btnCopy = document.querySelector('#btn-copy');
const outputMessage = document.querySelector('#output-message');

/* Click event: close modal */
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalMessage.innerHTML = '';
});

/* function for show message inside of modal */
const showMessageModal = (msg) => {
  modal.style.display = 'block';
  modalMessage.innerHTML = msg;
}

/* function for reset output message */
const resetOutputMessage = () => {
  if (window.innerWidth >= 1024) {
    blockPicture.style.display = 'inline';
  }
  blockTitle.innerHTML = title;
  blockSubtitle.innerHTML = subtitle;
  btnCopy.style.display = 'none';
  outputMessage.style.display = 'none';
  outputMessage.value = '';
}

/* function for swap key to value and value to key of a object */
const swapElementsObject = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

/* object with keys and values for encrypt messages */
const codex = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat'
};

/* object with keys and values for desencrypt messages */
const decodex = swapElementsObject(codex);

/* set focus on textarea */
message.focus();

/* Focus event: clear previous messages and reset output message */
message.addEventListener("focus", (event) => {
  event.target.value = '';
  resetOutputMessage();
});

/* Input event: message with lowercase and one space between words without special characters */
message.addEventListener('input', (event) => {
  let msg = event.target.value.toLowerCase();
  msg = msg.replace(/\s+/gu, ' ');
  msg = msg.replace(/[0-9àáäèéëìíïòóöùúüñ\`\-\=\[\]\;\'\,\.\/\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\¡\²\³\¤\€\¼\½\¾\¥\«\»\¬\¶\ç\¿\\]/g, '');
  event.target.value = msg;
});

/* function for validate message */
const validate = () => {
  resetOutputMessage();
  message.value = message.value.trim();
  if (message.value.length == 0) {
    showMessageModal('Por favor, ingresa el texto a encriptar o desencriptar');
    return false;
  }
  return true;
};

/* function with logic for show output message */
const setOutputMessage = (msg) => {
  blockPicture.style.display = 'none';
  blockTitle.innerHTML = '';
  blockSubtitle.innerHTML = '';
  btnCopy.style.display = 'block';
  outputMessage.style.display = 'block';
  outputMessage.value = msg;
}

/* function logic to encrypt/desencryt message by codex/decodex */
const logic = (obj) => {
  let msg = message.value;
  Object.keys(obj).forEach((element) => {
    msg = msg.replaceAll(element, obj[element]);
    console.log(element, obj[element], msg);
  });
  return msg;
}

/* Click event: logic for encrypt message */
btnEncrypt.addEventListener('click', () => {
  if (validate()) {
    let msgEncrypt = logic(codex);
    setOutputMessage(msgEncrypt);
  }
});

/* Click event: logic for desencrypt message */
btnDesencrypt.addEventListener('click', () => {
  if (validate()) {
    let msgDesencrypt = logic(decodex);
    setOutputMessage(msgDesencrypt);
  }
});

/* function for validate output message */
const validateCopy = () => {
  if (outputMessage.value.length == 0) {
    showMessageModal('No existe mensaje para copiar');
    return false;
  }
  return true;
};

/* Click event: logic for copy output message to clipboard */
btnCopy.addEventListener('click', () => {
  if (validateCopy()) {
    outputMessage.select();
    outputMessage.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(outputMessage.value);
    showMessageModal('El texto ha sido copiado al portapapeles');
    resetOutputMessage();
    message.value = '';
  }
});