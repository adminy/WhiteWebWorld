function removeActivePage(element) {
  element.classList.remove('is-current')
  element.removeAttribute('aria-current')
}

function changePage(e) {
  const pageNumber = e.target
  const pages = pageNumber.parentElement.parentElement.childNodes
  pages.forEach(page => page.firstChild.classList.contains('is-current') && removeActivePage(page.firstChild))
  pageNumber.classList.add('is-current')
  pageNumber.setAttribute('aria-current', 'page')
  const previousPage = document.querySelector('.pagination-previous')
  previousPage[(parseInt(pageNumber.innerText) === 1 ? 'set' : 'remove') + 'Attribute']('disabled', '')
  const nextPage = document.querySelector('.pagination-next')
  nextPage[(pages[pages.length - 1].innerText === pageNumber.innerText ? 'set' : 'remove') + 'Attribute']('disabled', '')
}

const PageNumber = ({ number, isOnThisPage }) => (
  <li>
    <a onclick={changePage} class={{ 'pagination-link': true, 'is-current': isOnThisPage }} aria-label={'Page ' + number} {...(isOnThisPage ? { 'aria-current': 'page' } : {})}>{number}</a>
  </li>
)
module.exports = () => (
  <nav class='pagination' role='navigation' aria-label='pagination'>
    <a class='pagination-previous' title='This is the first page' disabled>Previous</a>
    <a class='pagination-next'>Next page</a>
    <ul class='pagination-list'>
      <PageNumber number={1} isOnThisPage />
      {Array(7).fill(0).map((_, i) => <PageNumber number={i+2} />)}
    </ul>
  </nav>
)
