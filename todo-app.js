(function() {
    function crateAppTitle (title) { 
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
    
    function createTodoItemForm () { 
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control', 'input');
        input.placeholder = 'Input a Task';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary', 'submit-button');
        button.textContent = 'Add a Task';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }
    
    function createTodoList () { 
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem (name = 'this is a placeholder') {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Done!';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'X';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        document.querySelector('.submit-button').disabled = true;

        return {
            item, 
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp (container, title = 'TODO List', RecivedParcedList = [], key) { 
        let CurrentStoredList


        switch (key) {
            case 0:
            CurrentStoredList = 'storedList';
            parcedList = RecivedParcedList;
            console.log('key: ', key)
            console.log(parcedList)
            break;
            case 1:
            CurrentStoredList = 'storedList1';
            parcedList = RecivedParcedList;
            console.log('key: ', key)
            console.log(parcedList)
            break;
            case 2:
            CurrentStoredList = 'storedList2';
            parcedList = RecivedParcedList;
            console.log('key: ', key)
            console.log(parcedList)
            break;
        }




        let todoAppTitle = crateAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        function createParcedItems () {    
            for (i = 0; i < parcedList.length; i++) {
                
                let testItem = createTodoItem(parcedList[i].name);
                
                if (parcedList[i].done === true) testItem.item.classList.add('list-group-item-success');
                testItem.item.setAttribute('id', i);
                let id = testItem.item.getAttribute('id');
                console.log(id);
                console.log(parcedList[id]);

                todoList.append(testItem.item);
                
                testItem.doneButton.addEventListener('click', function () {
                    testItem.item.classList.toggle('list-group-item-success');
                    let doneState = testItem.item.classList.contains('list-group-item-success');
                    console.log(doneState);
                    parcedList[id].done = doneState;
                    console.log(parcedList);
                    localStorage.setItem(CurrentStoredList, JSON.stringify(parcedList));
                });
                testItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Are you sure?')) {testItem.item.remove();
                    parcedList.splice(id, 1);
                    localStorage.setItem(CurrentStoredList, JSON.stringify(parcedList));
                    location.reload();
                    }
                });
            };
        }; createParcedItems();
            

        let submitButton = document.querySelector('.submit-button');
        let inputField = document.querySelector('.input');
        
        submitButton.disabled = true;
        
        inputField.addEventListener("input", function stateHandle () {
            if (inputField.value.length != 0) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        });

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            let newItem = {
                name: todoItemForm.input.value,
                done: false,
            };
            parcedList.push(newItem);
            localStorage.setItem(CurrentStoredList, JSON.stringify(parcedList));
            console.log(parcedList);

            if (!todoItemForm.input.value) return;

            let todoItem = createTodoItem(todoItemForm.input.value);
            todoItem.item.setAttribute('id', parcedList.length - 1);
            let id = todoItem.item.getAttribute('id');

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
                let doneState = todoItem.item.classList.contains('list-group-item-success');
                console.log(doneState);
                parcedList[id].done = doneState;
                console.log(parcedList);
                console.log(todoItem.item);
                localStorage.setItem(CurrentStoredList, JSON.stringify(parcedList));
            });
            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Are you sure?')) {todoItem.item.remove();
                parcedList.splice(id, 1);
                localStorage.setItem(CurrentStoredList, JSON.stringify(parcedList));
                location.reload();
                }
            });

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
        });
    }

    window.createTodoApp = createTodoApp;
})();

