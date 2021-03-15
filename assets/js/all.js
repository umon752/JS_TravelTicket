AOS.init({
    duration: 600,
    once: true
});


/**
 * Data
 */
let data = [{
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];



/**
 * DOM
 */
// 選取 DOM
const card = document.querySelector(".js-cardList");
const selectArea = document.querySelector(".js-searchArea");
const searchCount = document.querySelector(".js-searchCount");
const addTicket = document.querySelector(".js-addTicket");



/**
 * init
 */
// 初始化 繪製 card
function init() {
    let str = "";
    let aosDelay = 0;
    data.forEach(function (item, index) {
        str += `<div class="col col-md-6 col-lg-4 position-relative mb-12" data-aos="fade-up" data-aos-delay="${aosDelay+index*100}">
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
    })
    card.innerHTML = str;
    searchCount.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
};
init();



/**
 * Controller
 */
// 下拉選單篩選
function selectFilter(e) {
    let str = "";
    let count = 0;
    data.forEach(function (item, index) {
        if (e.target.value === item.area) {
            str += `<div class="col col-md-6 col-lg-4 position-relative mb-12" data-aos="fade-up">
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
            count++;
        } else if (e.target.value === "全部地區") {
            str += `<div class="col col-md-6 col-lg-4 position-relative mb-12" data-aos="fade-up">
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
            count++;
        }
        card.innerHTML = str;
        searchCount.innerHTML = `本次搜尋共 ${count} 筆資料`;
    })
}
// 新增套票資料
function addTicketData(e) {
    const ticketName = document.querySelector(".js-ticketName");
    const ticketImg = document.querySelector(".js-ticketImg");
    const ticketArea = document.querySelector(".js-ticketArea");
    const ticketPrice = document.querySelector(".js-ticketPrice");
    const ticketGroup = document.querySelector(".js-ticketGroup");
    const ticketTag = document.querySelector(".js-ticketTag");
    const ticketDescription = document.querySelector(".js-ticketDescription");

    // 金額、組數、星級的 type 轉為 Number
    let ticketGroupValue = parseInt(ticketGroup.value);
    let ticketPriceValue = parseInt(ticketPrice.value);
    let ticketTagValue = parseInt(ticketTag.value);

    // 驗證數字 0-9
    const reg = new RegExp("^[0-9]*$");

    if (ticketName.value == '') {
        alert("套票名稱不可空白");
    } else if (ticketImg.value == '') {
        alert("圖片網址不可空白");
    } else if (ticketArea.value == '') {
        alert("景點地區不可空白");
    } else if (ticketPriceValue == '') {
        alert("套票金額不可空白");
    } else if (!reg.test(ticketPriceValue)) {
        alert("套票金額請輸入數字");
    } else if (ticketGroupValue == '') {
        alert("套票組數不可空白");
    } else if (!reg.test(ticketGroupValue)) {
        alert("套票組數請輸入數字");
    } else if (ticketTagValue == '' || !reg.test(ticketTagValue)) {
        alert("套票星級不可空白");
    } else if (ticketTagValue > 10 || !reg.test(ticketTagValue)) {
        alert("星級區間為 1-10 分");
    } else if (ticketDescription.value == '') {
        alert("套票描述不可空白");
    } else if (ticketDescription.value.length >= 100) {
        alert("字數不可超過 100 字");
    } else {
        data.push({
            "id": data.length,
            "name": ticketName.value,
            "imgUrl": ticketImg.value,
            "area": ticketArea.value,
            "description": ticketDescription.value,
            "group": ticketGroupValue,
            "price": ticketPriceValue,
            "rate": ticketTagValue
        })
        // 下選單設定顯示全部地區
        selectArea.value = "全部地區";
        // 刷新畫面
        init();
        // 清空 input 欄位
        ticketName.value = "";
        ticketImg.value = "";
        ticketArea.value = "";
        ticketDescription.value = "";
        ticketGroup.value = "";
        ticketPrice.value = "";
        ticketTag.value = "";
    }
}

selectArea.addEventListener("change", selectFilter, false);
addTicket.addEventListener("click", addTicketData, false)