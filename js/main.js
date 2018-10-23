'use strict';

window.addEventListener('DOMContentLoaded', documentReady, false);

function documentReady() {
	//создаём формы
	const form1 = document.createElement('form');
	form1.id = 'firstForm';
	form1.action = 'http://fe.it-academy.by/TestForm.php';
	const form2 = document.createElement('form');
	form2.id = 'secondForm';
	form2.action = 'http://fe.it-academy.by/TestForm.php';

	//добавляем формы на страницу
	document.body.appendChild(form1);
	document.body.appendChild(form2);

	function createForm(form, formDef) {
		for (let i = 0, n = formDef.length; i < n; i++) {

			let labelItem = document.createElement('label');
			labelItem.textContent = formDef[i].label;
			labelItem.style.cssText = 'display: inline-block; width: 180px';

			let inputItem = document.createElement('input');
			inputItem.type = 'text';
			inputItem.name = formDef[i].name;

			let newBr = document.createElement('br');

			switch (formDef[i].kind) {
				case 'longtext':
					form.appendChild(labelItem);

					inputItem.style.cssText = 'width: 500px';
					form.appendChild(inputItem);
					break;
				case 'number':
					form.appendChild(labelItem);

					inputItem.style.cssText = 'width: 80px';
					form.appendChild(inputItem);
					break;
				case 'shorttext':
					form.appendChild(labelItem);

					inputItem.style.cssText = 'width: 200px';
					form.appendChild(inputItem);
					break;
				case 'combo':
					form.appendChild(labelItem);

					let selectItem = document.createElement('select');
					selectItem.name = formDef[i].name;
					form.appendChild(selectItem);

					let optionsArr = formDef[i].variants;
					for (let j = 0, n = optionsArr.length; j < n; j++) {
						let option = document.createElement('option');
						option.value = optionsArr[j].value;
						option.textContent = optionsArr[j].text;
						selectItem.appendChild(option);
					}
					break;
				case 'radio':
					form.appendChild(labelItem);

					let radioArr = formDef[i].variants;
					for (let j = 0, n = radioArr.length; j < n; j++) {
						let inputRadio = document.createElement('input');
						inputRadio.type = 'radio';
						inputRadio.name = formDef[i].name;
						inputRadio.value = radioArr[j].value;
						inputRadio.id = 'radioId_' + (j + 1);
						form.appendChild(inputRadio);

						let radioText = document.createElement('label');
						radioText.textContent = radioArr[j].text;
						radioText.setAttribute('for', 'radioId_' + (j + 1));
						form.appendChild(radioText);
					}
					break;
				case 'check':
					form.appendChild(labelItem);
					labelItem.setAttribute('for', formDef[i].name + 'Id');

					inputItem.type = 'checkbox';
					inputItem.setAttribute('checked', '');
					inputItem.id = formDef[i].name + 'Id';
					inputItem.name = formDef[i].name;
					form.appendChild(inputItem);
					break;
				case 'memo':
					form.appendChild(labelItem);

					let textarea = document.createElement('textarea');
					textarea.name = formDef[i].name;
					textarea.style.cssText = 'width: 680px; display: block';
					form.appendChild(textarea);
					break;
				case 'submit':
					inputItem.type = formDef[i].kind;
					inputItem.value = formDef[i].label;
					form.appendChild(inputItem);
					break;
				default:
					break;
			}
			form.appendChild(newBr);
		}
	}

	var reqListener = function() {
		if (this.status === 200) { //200 - это OK
			const response = JSON.parse(this.responseText);
			createForm(form1, response.formDef1);
			createForm(form1, response.formDef2);
		} else {
			document.body.innerHTML = this.status + ' ' + this.statusText;
		}
	};

	var oReg = new XMLHttpRequest();
	oReg.onload = reqListener;
	oReg.open('get', '../data.json', true); //data.json - путь к файлу, true - асинхронно ли выполняется
	oReg.send();
}