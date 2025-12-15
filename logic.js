let record=[];
let btn=document.querySelector("#btn");
let show=document.querySelector("#disp");
let list=document.querySelector("#form");
let rad=document.querySelector("#read");
let submit=document.querySelector("#submit");
let display=document.querySelector("#display");
function creator(name,author,page,read){
this.name=name;
this.author=author;
this.page=page;
this.read=read;
this.uuid=crypto.randomUUID();
}
function form(){
display.replaceChildren();
btn.style["display"]="none";
show.style["display"]="none";
let bname=book("Book Name*: ","text");
let aname=book("Author Name*: ","text");
let btitle=book("Book Page*: ","number");
let rread=radio("Read");
let runread=radio("Unread");
let sbutton=document.createElement("button");
sbutton.type="submit";
sbutton.textContent="Submit";
//document.querySelector("#total")
sbutton.addEventListener("click",(e)=>{
    e.preventDefault();
    let curr=new creator(bname.value,aname.value,btitle.value,rread.value);
    record.push(curr);
    refresh();
    console.log(record);
});
submit.appendChild(sbutton);
}
function refresh(){
list.replaceChildren();
rad.replaceChildren();
submit.replaceChildren();
btn.style["display"]="inline-block";
if(record.length>0) show.style.display="inline-block";
}
function radio(field){
    let r1=document.createElement("input");
    r1.type="radio";
    r1.name="check";
    let label=document.createElement("label");
    label.htmlFor=`${field}`;
    r1.id=`${field}`;
    if(field=="Unread") r1.checked=true;
    label.textContent=`${field}`;
    rad.appendChild(label);
    rad.appendChild(r1);
    return r1;
}
function book(field,type){
    let name=document.createElement("input");
    name.type=`${type}`;
    let label=document.createElement("label");
    label.htmlFor=`${field}`;
    name.id=`${field}`;
    label.textContent=`${field}`;
    name.required=true;
    list.appendChild(label);
    list.appendChild(name);
    return name;
}
function showbook(){
    show.style.display="none";
    for(let i of record){
        let box=document.createElement("div");
        let bname=document.createElement("div");
        let bauthor=document.createElement("div");
        let bpage=document.createElement("div");
        let status=document.createElement("div");
        bname.textContent="Book Name: "+ `${i.name}`;
        bauthor.textContent="Book Author: "+ `${i.author}`;
        bpage.textContent="No of Pages: "+`${i.page}`;
        status.textContent=i.read?"Book is read":"Book is unread";
        let tbutton=document.createElement("button");
        let del_ele=document.createElement("button");
        tbutton.type="button";
        del_ele.type="button";
        tbutton.textContent="Toggle";
        del_ele.textContent="Remove";
        tbutton.addEventListener("click",()=>{
            status.textContent=!i.read?"Book is read":"Book is unread"
        });
        del_ele.addEventListener("click",()=>{
            record.splice(record.indexOf(i),1);
            display.removeChild(box);
        });
        box.style["background-color"]="#1e293b";
        box.style["text-align"]="center";
        box.appendChild(bname);
        box.appendChild(bauthor);
        box.appendChild(bpage);
        box.appendChild(status);
        box.appendChild(tbutton);
        box.appendChild(del_ele);
        box.style.padding="20px";
        box.style["line-height"]="5vh";
        display.appendChild(box);
        
    } 
}
btn.addEventListener("click",()=>
form()
);
show.addEventListener("click",()=>showbook());
