console.log('init');
const locations = [
    { code: '335', name: '문  산', lat: 37.8546778, long: 126.7880586 },
    { code: '334', name: '파  주', lat: 37.8154248, long: 126.7925726 },
    { code: '333', name: '월  롱', lat: 37.7962006, long: 126.7927551 },
    { code: '331', name: '금  촌', lat: 37.7661862, long: 126.7745934 },
    { code: '330', name: '금  릉', lat: 37.7513962, long: 126.7655217 },
    { code: '329', name: '운  정', lat: 37.7255157, long: 126.7672157 },
    { code: '328', name: '야  당', lat: 37.7127585, long: 126.7616605 },
    { code: '327', name: '탄  현', lat: 37.6940966, long: 126.7611893 },
    { code: '326', name: '일  산', lat: 37.6823084, long: 126.7696284 },
    { code: '325', name: '풍  산', lat: 37.6728153, long: 126.7861015 },
    { code: '324', name: '백  마', lat: 37.6583988, long: 126.7945243 },
    { code: '323', name: '곡  산', lat: 37.6463141, long: 126.8016099 },
    { code: '322', name: '대  곡', lat: 37.6318766, long: 126.8100858 },
    { code: '321', name: '능  곡', lat: 37.6189921, long: 126.8208819 },
    { code: '320', name: '행  신', lat: 37.6125044, long: 126.8341166 },
    { code: '319', name: '강매 (루트로닉)', lat: 37.6121384, long: 126.8446439 },
    { code: '318', name: '한국항공대', lat: 37.6025532, long: 126.8679836 },
    { code: '317', name: '수  색', lat: 37.5810242, long: 126.8958408 },
    { code: '316', name: '디지털미디어시티', lat: 37.5776448, long: 126.9007761 },
    { code: '315', name: '가  좌', lat: 37.5689028, long: 126.9149122 },
    { code: '314', name: '홍 대 입 구', lat: 37.5572272, long: 126.9278079 },
    { code: '313', name: '서 강 대', lat: 37.5521373, long: 126.9358194 },
    { code: '312', name: '공  덕', lat: 37.5425916, long: 126.9523168 },
    { code: '311', name: '효창공원앞', lat: 37.5395691, long: 126.9616278 },
    { code: '312', name: '용  산', lat: 37.5302182, long: 126.9648546 },
    { code: '313', name: '이  촌', lat: 37.5221891, long: 126.9735952 },
    { code: '314', name: '서 빙 고', lat: 37.5194854, long: 126.9889366 },
    { code: '315', name: '한  남', lat: 37.529251, long: 127.0090021 },
    { code: '316', name: '옥  수', lat: 37.5403725, long: 127.0186318 },
    { code: '317', name: '응  봉', lat: 37.5503891, long: 127.035042 },
    { code: '318', name: '왕 십 리', lat: 37.5622085, long: 127.0381041 },
    { code: '319', name: '청 량 리', lat: 37.5817577, long: 127.0492208 },
];
const stationBadge = document.querySelector('.station-badge text:nth-of-type(2)');
const stationNameMain = document.querySelector('.station-name-main');
const onUpdate = (position) => {
    let minDiff;
    let chosenSt = { code: '999', name: '알 수 없 음' };
    for (const st of locations) {
        const latDiff = Math.abs(position.coords.latitude - st.lat);
        const longDiff = Math.abs(position.coords.longitude - st.long);
        const diffSum = latDiff + longDiff;
        if (minDiff === undefined || diffSum < minDiff) {
            minDiff = diffSum;
            chosenSt = st;
        }
    }
    stationBadge.textContent = chosenSt.code;
    stationNameMain.textContent = chosenSt.name;
};
stationBadge.textContent = '---';
stationNameMain.textContent = '로 드 중';

function onError(e) {
    console.error(e);
}

window.onload = function () {
    if (navigator.geolocation === undefined) {
        stationNameMain.textContent = '지원 안됨';
        return;
    }
    var initWatch = function (alreadyGranted, notGrantedReason) {
        stationNameMain.textContent = '잠 시 만';
        if (!alreadyGranted) {
            stationNameMain.textContent = '화면을 터치';
            console.error(notGrantedReason);
            stationNameMain.onclick = function () {
                stationNameMain.textContent = '위치 요청됨';
                stationNameMain.onclick = undefined;
                navigator.geolocation.watchPosition(onUpdate, onError);
            };
        } else {
            navigator.geolocation.watchPosition(onUpdate, onError);
        }
    };
    if (navigator.permissions !== undefined) {
        navigator.permissions
            .query({ name: 'geolocation' })
            .then(function (result) {
                if (result.state === 'granted') {
                    initWatch(true);
                } else if (result.state == 'denied') {
                    stationNameMain.textContent = '권한 거부';
                } else if (result.state == 'prompt') {
                    initWatch(false, 'Geolocation permission needed');
                } else {
                    initWatch(false, 'Unknown permission state "' + result.state);
                }
            })
            .catch(function (e) {
                initWatch(false, 'permission state unknown: ' + e);
            });
    } else {
        initWatch(false, 'permission API not supported');
    }
};
