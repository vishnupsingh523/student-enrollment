function validate()
{
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var website = document.getElementById("website");
    var imglink = document.getElementById('imglink')
    var gender = document.getElementsByClassName('gender')
    var skills = document.getElementsByClassName('skill')

    var skillCount=0, genderCount = 0
    // checking if skill is NULL
    for(let i in skills)
    if(skills[i].checked == false)
    skillCount++

    // checking if gender is NULL
    for(let i in gender)
    if(gender[i].checked== false)
    genderCount++


    if(name.value.trim() == "" || email.value.trim() =="" || website.value.trim()=="" || imglink.value.trim()=="")
    {
        alert("Form fields cannot be empty !!")
        return false;
    }
    else if(!isValidUrl(website.value))
    {
        alert('Website\n\nURL is INVALID !!!')
        return false
    }
    else if(!isValidUrl(imglink.value))
    {
        alert('Image Link\n\nURL is INVALID !!!')
        return false
    }
    else if(genderCount==2)
    {
        alert('Gender\nField cannot be empty !\nSelect the option.')
        return false
    }
    else if(skillCount==3)
    {
        alert('Skill\nField cannot be empty !\nSelect the correct option.')
        return false
    }
    else{
        return true
    }

}

// VALIDATING A URL
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

var userName = document.getElementById('name');
userName.addEventListener('keyup', (e)=>{
    if((e.keyCode >=48 && e.keyCode <=57) ||( e.keyCode>=96&&e.keyCode<=111)|| (e.keyCode>=186&&e.keyCode<=222 ))
    {
        alert('Name: Only alphabets are allowed !')
    }
})

//  IMPLEMENTING LOCAL STORAGE

const addData = ()=>{
    if(validate() == false)
    return

    let data = []

    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var website = document.getElementById('website').value
    var imglink = document.getElementById('imglink').value
    var gender = document.getElementsByClassName('gender')
    var skills = document.getElementsByClassName('skill')

    var skill=[]
    for(var i=0;i<3;i++)
    {
        if(skills[i].checked==true)
        skill.push(skills[i].value)
    }

    // get local session data
    var localData = sessionStorage.getItem("data");
    if(localData != null)
    {
        data = JSON.parse(localData)
    }
    
    let dataObject = {
        name : name,
        email : email,
        website : website,
        imglink : imglink,
        gender : (gender[0].checked==true)?gender[0].value:gender[1].value,
        skills : skill,
        id : Math.trunc(Math.random() * 1000)
    }

    data.push(dataObject)

    sessionStorage.setItem("data", JSON.stringify(data))


    // displaying data
    showData()
}

// Showing Enrolled students data
const showData = ()=>{
    var dataString = sessionStorage.getItem('data')
    var tableString = `
        <table>
            <thead class="border">
                <tr>
                    <th class="border">Description</th>
                    <th class="border">Image</th>
                </tr>
            </thead>
            <tbody>
    `
    let content = tableString
    if(dataString!=null)
    {
        data = JSON.parse(dataString)

        for(let i = 0; i<data.length; i++)
        {
            let skillString =""
            for(let j in data[i].skills)
            skillString = skillString+' ' + data[i].skills[j]
            content += `
            <tr>
                <td><h4>${data[i].name}</h4>
                ${data[i].gender}<br>
                ${data[i].email}<br>
                <a href="${data[i].website}" target="_blank">${data[i].website}</a>
                <br>${skillString}</td>
                <td align="middle"><img src="${data[i].imglink}"/></td>
            </tr>
        `
        }

    }
    
    content = content + "</tbody></table>"
    document.getElementById('result-table').innerHTML = content
}