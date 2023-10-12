export default function decorate(block) {
  const list = document.createElement('ul');
  fetch(window.origin + '/query-index.json').then((response) => {
    response
      .json()
      .then((jsonObj) => {
        const { data } = jsonObj;
        for (const element of data) {
          const li = document.createElement('li');
          li.textContent = `${element.title} (${element.path})`;
          list.append(li);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    block.append(list);
  });
}
