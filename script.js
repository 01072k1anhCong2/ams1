"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const deleteData = document.getElementById("delete-data");
const healthybtn = document.getElementById("healthy-btn");
const thantbody = document.getElementById("tbody");
// ----------------------------

//add data for pet of list
const petArr = [];
const healthyPetArr = [];
/////////////////////////////
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "";
  breedInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
//nut xoa du lieu
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == petId) {
        petArr.splice(i, 1);
        console.log(petArr);
        renderTableData(petArr);
        break;
      }
    }
    // const removeIndex = petArr.findIndex((item) => item.id === petId);
    // petArr.splice(removeIndex, 1);
    // console.log(petArr);
  }
};
///tinh trung binh cua thu cung
function tinhbmi() {
  for (let i = 0; i < petArr.length; i++) {
    let BMI = 0;
    if (petArr[i].type == "Dog") {
      BMI = (petArr[i].weight * 703) / petArr[i].length ** 2;
      petArr[i].bmi = BMI;
    }
    if (petArr[i].type == "Cat") {
      BMI = (petArr[i].weight * 703) / petArr[i].length ** 2;
      petArr[i].bmi = BMI;
    }
    renderTableData(petArr);
  }
}
function validateData(data) {
  if (idInput.value == "") {
    alert("id must input");
    console.log(idInput.value);
    return false;
  }
  if (idInput.value !== "") {
    // tranh trung lap id
    for (let i = 0; i < petArr.length; i++) {
      if (idInput.value == petArr[i].id) {
        alert("ID has been duplicated, please enter again");
        return false;
      }
    }
  }
  if (nameInput.value == "") {
    alert("name must input");
    return false;
  }

  if (parseInt(data.age) < 1 || parseInt(data.age) > 15 || !data.age) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (parseInt(data.weight) < 1 || parseInt(data.weight) > 15 || !data.weight) {
    alert("weight must be between 1 and 15!");
    return false;
  }
  if (
    parseInt(data.length) < 1 ||
    parseInt(data.length) > 100 ||
    !data.length
  ) {
    alert("length must be between 1 and 100!");
    return false;
  }
  if (data.type == "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (data.breed == "Select Breed") {
    alert("Please select Breed!");
    return false;
  } else {
    return true;
  }
}

function renderTableData(petArr) {
  thantbody.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
  <td>${petArr[i].name}lon</td>
  <td>${petArr[i].age}</td>
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight}</td>
  <td>${petArr[i].length}</td>
  <td>${petArr[i].breed}</td>
  <td>
  <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td><i class="bi ${
    petArr[i].vaccinated ? `bi-check-circle-fill` : ` bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    petArr[i].dewormed ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    petArr[i].sterilized ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
  }"></i></td>
  <td>${petArr[i].bmi}</td>
  <td>${petArr[i].date}</td>
  <td>
  <button type="button" class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
  </td>`;
    thantbody.appendChild(row);
  }
}

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    bmi: "no data",
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    if (data.vaccinated && data.dewormed && data.sterilized)
      healthyPetArr.push(data);
    clearInput();
    renderTableData(petArr);
    console.log(healthyPetArr);
  } else {
    console.log(validate);
  }
});
////nut bat su kien thu  khoe tre dep
let healthyCheck = false;
healthybtn.addEventListener("click", function () {
  ///chuyen nut
  if (!healthyCheck) {
    renderTableData(healthyPetArr);
    healthybtn.innerHTML = "Show All Pet";
    console.log(healthyCheck);
  } else {
    renderTableData(petArr);
    healthybtn.innerHTML = "Show Healthy Pet";
    console.log(healthyCheck);
  }
  ///chuyen nut
  healthyCheck = !healthyCheck;
});
