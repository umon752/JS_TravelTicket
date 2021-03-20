AOS.init({
    duration: 600,
    once: true
});


/**
 * Data
 */
let data = [];

/**
 * DOM
 */
// 選取 DOM
const card = document.querySelector(".js-cardList");
const selectArea = document.querySelector(".js-searchArea");
const searchCount = document.querySelector(".js-searchCount");
const addTicket = document.querySelector(".js-addTicket");
const form = document.querySelector(".js-form");

const ticketName = document.querySelector(".js-ticketName");
const ticketImg = document.querySelector(".js-ticketImg");
const ticketArea = document.querySelector(".js-ticketArea");
const ticketPrice = document.querySelector(".js-ticketPrice");
const ticketGroup = document.querySelector(".js-ticketGroup");
const ticketTag = document.querySelector(".js-ticketTag");
const ticketDescription = document.querySelector(".js-ticketDescription");
const verify = document.querySelectorAll(".js-verify");





/**
 * init
 */
// 初始化 繪製 card
function init() {
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
        .then(function (response) {
            data = response.data.data;
            render(data);
        });
};
init();


// card 渲染畫面
function render(data) {
    let str = "";
    data.forEach(function (item, index) {
        str += renderStr(item, index);
    })
    card.innerHTML = str;
}



// HTML 結構
function renderStr(item, index) {
    let aosDelay = 0;
    return `<div class="col col-md-6 col-lg-4 position-relative mb-12" data-aos="fade-up" data-aos-delay="${aosDelay+index*100}">
        <div class="tag bg-primary-light font-size-m text-white py-3 px-8">${item.area}</div>
        <div class="rounded-base bg-white shadow overflow-hidden h-100">
            <a href="#" class="d-block overflow-hidden hover-img-scale-bigger">
                <img src="${item.imgUrl}" class="cardImg w-100">
            </a>
            <div class="cardContent position-relative">
                <div class="tag bg-primary text-white py-1 px-3">${item.rate}</div>
                <div class="d-flex flex-column justify-content-between h-100 px-8 pt-8 pb-6">
                    <div>
                    <h2 class="border-primary border-bottom-bold pb-1 mb-7">
                        <a href="#"
                            class="font-size-l text-primary hover-text-primary-light font-weight-bold">${item.name}</a>
                    </h2>
                    <p class="text-secondary mb-9">
                    ${item.description}
                    </p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <p class="text-primary d-flex align-items-center">
                            <span class="material-icons mr-2">
                                error
                            </span>剩下最後 ${item.group} 組</p>
                        <h3 class="text-primary font-size-xl font-weight-bold d-flex align-items-center">
                            <span class="font-size-base font-weight-normal mr-1">TWD</span>${item.price}</h3>
                    </div>
                </div>
            </div>
        </div>
        </div>`
}



/**
 * Controller
 */
// 下拉選單篩選
function selectFilter(e) {
    let str = "";
    let count = 0;
    data.forEach(function (item, index) {
        if (e.target.value === item.area) {
            str += renderStr(item, index);
            count++;
        } else if (e.target.value === "全部地區") {
            str += renderStr(item, index);
            count++;
        }
    })
    card.innerHTML = str;
    searchCount.innerHTML = `本次搜尋共 ${count} 筆資料`;
}

// 驗證與新增套票資料
function addTicketData(e) {

    // 金額、組數、星級的 type 轉為 Number
    let ticketPriceValue = parseInt(ticketPrice.value);
    let ticketGroupValue = parseInt(ticketGroup.value);
    let ticketTagValue = parseInt(ticketTag.value);

    // 建立新增資料的物件格式
    let newData = {
        id: data.length,
        name: ticketName.value,
        imgUrl: ticketImg.value,
        area: ticketArea.value,
        description: ticketDescription.value,
        group: ticketGroupValue,
        price: ticketPriceValue,
        rate: ticketTagValue
    }


    if (ticketName.value == '') {
        ticketName.focus();
        verify[0].textContent = "套票名稱不可空白";
    } else if (ticketImg.value == '') {
        ticketImg.focus();
        verify[1].textContent = "圖片網址不可空白";
    } else if (ticketArea.value == '請選擇景點地區') {
        ticketArea.focus();
        verify[2].textContent = "請選擇景點地區";
    } else if (isNaN(ticketPriceValue)) {
        ticketPrice.focus();
        verify[3].textContent = "套票金額不可空白";
    } else if (isNaN(ticketGroupValue)) {
        ticketGroup.focus();
        verify[4].textContent = "套票組數不可空白";
    } else if (isNaN(ticketTagValue)) {
        ticketTag.focus();
        verify[5].textContent = "套票星級不可空白";
    } else if (ticketTagValue > 10) {
        ticketTag.focus();
        verify[5].textContent = "星級區間為 1-10 分";
    } else if (ticketDescription.value == '') {
        ticketDescription.focus();
        verify[6].textContent = "套票描述不可空白";
    } else if (ticketDescription.value.length >= 100) {
        ticketDescription.focus();
        verify[6].textContent = "字數不可超過 100 字";
    } else {
        // 新增表單填寫資料
        data.push(newData);
        // 下選單設定顯示全部地區
        selectArea.value = "全部地區";
        // 清空 input 欄位
        form.reset();
        // 刷新 card 渲染畫面
        render(data);
    }
}


// 清除驗證文字
function inputValue(e) {

    if (ticketName.value !== '') {
        verify[0].textContent = "";
    }

    if (ticketImg.value !== '') {
        verify[1].textContent = "";
    }

    if (ticketArea.value !== '') {
        verify[2].textContent = "";
    }

    if (ticketPrice.value !== '') {
        verify[3].textContent = "";
    }

    if (ticketGroup.value !== '') {
        verify[4].textContent = "";
    }

    if (ticketTag.value !== '') {
        verify[5].textContent = "";
    }

    if (ticketDescription.value !== '') {
        verify[6].textContent = "";
    }
}



// 清除驗證文字
form.addEventListener("input", inputValue, false);
// 下拉選單篩選
selectArea.addEventListener("change", selectFilter, false);
// 驗證與新增套票資料
addTicket.addEventListener("click", addTicketData, false);