import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const getUri = (img) => {
    const optiPic = createOptimizedPicture(img.src, img.alt, false, [
      { height: '300' },
    ]);
    return img ? optiPic?.querySelector('img')?.src : '';
  };
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        const image = getUri(
          div.querySelector('picture')?.querySelector('img')
        );
        console.log(
          '🚀 ~ file: CustomCards.js:15 ~ [...li.children].forEach ~ image:',
          image
        );
        div.style = "background-image: url('" + image + "');        ";
        div.className = 'customcards-card-image parallax';
      } else div.className = 'customcards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) =>
    img
      .closest('picture')
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
      )
  );
  block.textContent = '';
  block.append(ul);
}
