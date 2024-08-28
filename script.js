let myTaskArray = JSON.parse(localStorage.getItem("myTaskArray")) || [];
let submitBtn = document.getElementById("submit")
let inputTask = document.getElementById("input")
let uiTaskList = document.getElementById("task-list")


window.addEventListener("DOMContentLoaded", () => {
    upDateUI(myTaskArray)
    submitBtn.addEventListener("click", () => {
        if (inputTask.value) {
            let taskObj = {}

            taskObj.taskName = inputTask.value
            taskObj.isComplete = false
            taskObj.created = new Date
            upDateTaskArray(taskObj)
            inputTask.value = ""
        }
        else {
            alert("Noting To Update")
        }
    })

    function upDateTaskArray(taskObj) {
        myTaskArray.push(taskObj)
        localStorage.setItem("myTaskArray", JSON.stringify(myTaskArray));
        upDateUI(myTaskArray)
    }

    function upDateUI(taskArr) {
        uiTaskList.innerHTML = "";
        taskArr.forEach((element, index) => {
            const listItemClass = element.isComplete ? "lis true" : "lis";
            uiTaskList.innerHTML += `
                <li title="Created at: ${element.created}" class="${listItemClass}" data-index="${index}">
                    <p id="task-index">${index + 1}</p>
                    <p>${element.taskName}</p>
                    <button class="close-btn" data-index="${index}">X</button>
                </li>`;
        });

        document.querySelectorAll(".close-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation()
                const index = e.target.getAttribute("data-index");
                removeTask(index);
            });
        });

        document.querySelectorAll(".lis").forEach((li)=>{
            li.addEventListener("click",(e)=>{
                const index = e.currentTarget.getAttribute("data-index");
                taskcomplete(index);
            })
        })
    }

    function removeTask(index) {
        myTaskArray.splice(index,1);
        localStorage.setItem("myTaskArray", JSON.stringify(myTaskArray));
        upDateUI(myTaskArray);
    }

    function taskcomplete(index){
        myTaskArray[index].isComplete = myTaskArray[index].isComplete ? false : true
        localStorage.setItem("myTaskArray", JSON.stringify(myTaskArray));
        upDateUI(myTaskArray);
    }

})