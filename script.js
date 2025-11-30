/*
DOM取得
================================================ */
const result = document.querySelector('#result')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const text = document.querySelector('#text')
/*
変数定義
================================================ */
let minLength = null
let maxLength = null
/*
関数定義
================================================ */
const getCount = () => {
    let lineBreakCnt = 0
    for (let i = 0; i < text.value.length; i++) {
        if (text.value[i] === '\n') {
            lineBreakCnt++
        }
    }
    return text.value.length - lineBreakCnt
}

const getColor = (cnt, min, max) => {
    if (cnt < min) {
        return 'grey'
    } else if (cnt > max && max !== null) {
        return 'red'
    } else {
        return 'green'
    }
}

const updateColor = () => {
    const span = result.querySelector('span')
    if (!span) {
        return
    }
    span.style.color = getColor(getCount(), minLength, maxLength)
}

const validateMinMax = (source) => {
    if (minLength !== null && maxLength !== null && minLength > maxLength) {
        if (source === 'min') {
            alert('最低文字数は最大文字数よりも小さい値を指定してください')
            minLength = null
            min.value = ''
        } else if (source === 'max') {
            alert('最大文字数は最低文字数よりも大きい値を指定してください')
            maxLength = null
            max.value = ''
        }
    }
}

const handleMinChange = (e) => {
    minLength = e.target.value === '' ? null : Number(e.target.value)
    validateMinMax('min')
    updateColor()
}

const handleMaxChange = (e) => {
    maxLength = e.target.value === '' ? null : Number(e.target.value)
    validateMinMax('max')
    updateColor()
}

const handleTextInput = () => {
    result.textContent = ``
    result.insertAdjacentHTML('beforeend', `現在 <span>${getCount()}</span> 文字`)
    updateColor()
}
/*
イベントリスナー
================================================ */
min.addEventListener('change', handleMinChange)
max.addEventListener('change', handleMaxChange)
text.addEventListener('input', handleTextInput)
