let fine = 0, point = 0, deten = 0, num = "X", bail = 0;
let felony = false

document.getElementById('calc').addEventListener('click', async() => {
    await fetch('json/law.json').then((a) => a.json()).then(async (law) => {
        for(i in law.felony) {
            let isCheck = document.getElementById(i).checked;
    
            if(isCheck) {
                felony = true

                fine += parseInt(law.felony[i].벌금)
                deten += parseInt(law.felony[i].구금)

                if(point < parseInt(law.felony[i].벌점)) {
                    point = parseInt(law.felony[i].벌점)
                }
            }
        }
        for(i in law.official) {
            let isCheck = document.getElementById(i).checked;
    
            if(isCheck) {
                fine += parseInt(law.official[i].벌금)
                deten += parseInt(law.official[i].구금)

                if(point < parseInt(law.official[i].벌점)) {
                    point = parseInt(law.official[i].벌점)
                }
            }
        }
        for(i in law.traffic) {
            let isCheck = document.getElementById(i).checked;
    
            if(isCheck) {
                if(i == "운전면허증미소지" || i == "난폭운전" && felony == true) {
                    fine += parseInt(law.traffic[i].벌금)
                    deten += parseInt(law.traffic[i].구금)
    
                    if(point < parseInt(law.traffic[i].벌점)) {
                        point = parseInt(law.traffic[i].벌점)
                    }
                } else if(!felony) {
                    fine += parseInt(law.traffic[i].벌금)
                    deten += parseInt(law.traffic[i].구금)
    
                    if(point < parseInt(law.traffic[i].벌점)) {
                        point = parseInt(law.traffic[i].벌점)
                    }
                }
            }
        }
    })

    if(deten > 120) { // 최대 구금시간 ex) 120분 넘어가면 120고정
        deten = 120;
    }
    
    if(deten < 31) {
        // This here can be empty
    } else {
        bail = ((deten-30) * 1000000) + fine;
    }

    if(document.getElementById('고유번호').value) {
        num = document.getElementById('고유번호').value
    }

    let params = { "fine": fine, "point": point, "deten": deten, "num": num, "bail": bail }

    var form = document.createElement('form');
    form.setAttribute('method', 'post'); //POST 메서드 적용
    form.setAttribute('action', '/finish');	// 데이터를 전송할 url
    for ( var key in params) {	// key, value로 이루어진 객체 params
        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden'); //값 입력
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();	// 전송
})

const changeNbc = () => {
    var chckbx = document.getElementById('nbc');
    var element1 = document.getElementById('고유번호');
    if (chckbx.checked == true) {
        element1.style.display = "inline";
    } else {
        element1.style.display = "none";
    }
}
