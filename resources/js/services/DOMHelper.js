export default {
    lockFormButton(formNode, flag) {
        let button = formNode.querySelector('[type=submit]');

        if (button) {
            if (flag) {
                button.setAttribute('disabled', '');
            } else {
                button.removeAttribute('disabled');
            }
        }
    },
    lockNode(node, flag) {
        if (flag) {
            node.classList.add('loading');

            return;
        }

        node.classList.remove('loading');
    },
    lockRootNode(flag) {
        this.lockNode(
            document.getElementById('app'),
            flag
        )
    }
}
