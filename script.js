const result = document.querySelector('#result')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const input = document.querySelector('#input')

let minLength = null
let maxLength = null

const getCount = () => {
    let lineBreakCnt = 0
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === '\n') {
            lineBreakCnt++
        }
    }
    return input.value.length - lineBreakCnt
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

min.addEventListener('change', (e) => {
    minLength = e.target.value === '' ? null : Number(e.target.value)
    validateMinMax('min')
    updateColor()
})

max.addEventListener('change', (e) => {
    maxLength = e.target.value === '' ? null : Number(e.target.value)
    validateMinMax('max')
    updateColor()
})

input.addEventListener('input', () => {
    result.textContent = ``
    result.insertAdjacentHTML('beforeend', `現在 <span>${getCount()}</span> 文字`)
    updateColor()
})
