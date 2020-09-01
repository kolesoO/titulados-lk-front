export default {
    getNode: function () {
        return document.getElementById('sys-message');
    },
    show: function (msg) {
        let node = this.getNode();

        node.innerText = msg;
        node.classList.add('active');

        setTimeout(function () {
            node.classList.remove('active');
        }, 5000);

        setTimeout(function () {
            node.innerText = '';
        }, 7000);
    }
}
