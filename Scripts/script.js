         const clean = () =>{
                   const menu = document.getElementById('menu');
                   const menu_div = document.getElementById('dropDownMenu')
                   menu_div.removeChild(document.getElementById('links'));
                    menu.className='notClicked';
                      menu_div.className= "notClicked";
                 }

                 const menu = document.getElementById('menu');
                 const menu_div = document.getElementById('dropDownMenu');

                 const dropDownMenu = () => {
                   if (menu.className == "notClicked"){
                   const elements = [{"id":"technologies"},{"id":"resume"},{"id":"portfolio"},{"id":"social"}];
                   const div = document.createElement("div");
                   div.style.height = "10%";
                    div.style.width = "11%";
                    div.id = "links";
                   elements.forEach((element)=>{
                    const a = document.createElement('a');
                    a.id = element.id;
                    a.href = `#${element.id}`;
                    a.innerHTML = element.id+"<br>";
                    a.onclick = ()=>{
                    clean();
                    };
                    div.appendChild(a);

                   });
                  menu_div.appendChild(div);
                  menu.className= "clicked";
                    menu_div.className= "clicked";
                 }
                 else{
              clean();
               }
                 }


                const setFileSource = async function(element,number){
                  console.log(`Setting img source with ${number} and ${element}`);

                  try{
                    const counter = document.getElementById("index");
                  const response = await fetch(`/Portfolio/${number}`);
                  console.log(  `/Portfolio/${number}`);
                  const json =  await response.json();

                  document.getElementById(element).src = json.path;
                }

                catch (exc){
                  console.log(exc);}
                }




              window.onload= () => {
                      var index = document.getElementById('index');
                      index.value = index.value != null ? index.value : 1;
                      console.log (`initial index value = ${index.value}`);
                      console.log (`index.value = ${index.value}`);

                  const update = () =>{
                    console.log("updating");
                    index = document.getElementById('index');

                  let current = parseInt(index.value);

                   const setFiles = async() => {
                     const count_response = await fetch("/Portfolio/count");
                     const count = await count_response.json();
                     if (current==count.count){
                       current = 0;
                         index.value=0;

                       }
                     if (current<0){
                        index.value= count.count-1;
                        current = count.count-1;
                      }
                     let next_index = current+1<count.count ? current+1 : 0;
                     let previous_index = current-1<0 ? count.count-1 : current-1;
                    console.log("count "+count.count);

                    await   setFileSource("current",current);
                      await   setFileSource("previous",previous_index);
                        await   setFileSource("next",next_index);

                  }

                  setFiles();
                }
                  document.getElementById("dropDownMenu").addEventListener("focusout",()=>{
clean();
                  });
                  document.getElementById('index').addEventListener('input',(evt)=>{
                  update();
                  });

                    document.getElementById("menu").addEventListener('click',() => {
                      dropDownMenu();
                    });
                  document.getElementById("add").addEventListener('click',() => {


                      index.value = parseInt(index.value)+1;
                      update();

                  });
                  document.getElementById("substract").addEventListener('click',() =>{

                        index.value = parseInt(index.value)-1;
                        update();
                  });

                    update();


            }
