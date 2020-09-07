export default {
    getNode: function () {
        return document.getElementById('sys-message');
    },
    show: function (err) {
        let node = this.getNode();

        node.innerText = err.message;
        node.classList.add('active');

        setTimeout(function () {
            node.classList.remove('active');
        }, 5000);

        setTimeout(function () {
            node.innerText = '';
        }, 7000);
    }
}
