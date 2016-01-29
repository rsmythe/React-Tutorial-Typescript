var Commenter;
(function (Commenter) {
    class CommentDTO {
        constructor(id, author, text) {
            this.id = id;
            this.author = author;
            this.text = text;
        }
    }
    Commenter.CommentDTO = CommentDTO;
    class CommentProps {
    }
    Commenter.CommentProps = CommentProps;
    class CommentState {
    }
    Commenter.CommentState = CommentState;
    class Comment extends React.Component {
        constructor(props) {
            super(props);
        }
        rawMarkup() {
            var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
            return { __html: rawMarkup };
        }
        render() {
            return (React.createElement("div", {className: "comment"}, React.createElement("h2", {className: "commentAuthor"}, this.props.author), React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})));
        }
    }
    Commenter.Comment = Comment;
})(Commenter || (Commenter = {}));
var Commenter;
(function (Commenter) {
    class CommentListProps {
    }
    Commenter.CommentListProps = CommentListProps;
    class CommentListState {
        constructor(comments) {
            this.comments = comments;
        }
    }
    Commenter.CommentListState = CommentListState;
    class CommentList extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            var commentNodes = this.props.comments.map((comment) => {
                return (React.createElement(Commenter.Comment, {author: comment.author, key: comment.id, children: ""}, comment.text));
            });
            return (React.createElement("div", {className: "commentList"}, commentNodes));
        }
    }
    Commenter.CommentList = CommentList;
})(Commenter || (Commenter = {}));
var Commenter;
(function (Commenter) {
    class CommentFormProps {
    }
    Commenter.CommentFormProps = CommentFormProps;
    class CommentFormState {
        constructor(author, text) {
            this.author = author;
            this.text = text;
        }
    }
    Commenter.CommentFormState = CommentFormState;
    class CommentForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = new CommentFormState("", "");
        }
        handleAuthorChange(e) {
            this.setState(new CommentFormState(e.target.value, this.state.text));
        }
        handleTextChange(e) {
            console.log(e);
            this.setState(new CommentFormState(this.state.author, e.target.value));
        }
        handleSubmit(e) {
            e.preventDefault();
            var author = this.state.author.trim();
            var text = this.state.text.trim();
            if (!text || !author) {
                return;
            }
            this.props.onCommentSubmit(new Commenter.CommentDTO(null, author, text));
            this.setState({ author: '', text: '' });
        }
        render() {
            return (React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit.bind(this)}, React.createElement("h1", null, "Enter your comment!"), React.createElement("input", {type: "text", placeholder: "Your name", value: this.state.author, onChange: this.handleAuthorChange.bind(this)}), React.createElement("input", {type: "text", placeholder: "Say something...", value: this.state.text, onChange: this.handleTextChange.bind(this)}), React.createElement("input", {type: "submit", value: "Post"})));
        }
    }
    Commenter.CommentForm = CommentForm;
})(Commenter || (Commenter = {}));
var CommentList = Commenter.CommentList;
var Commenter;
(function (Commenter) {
    class CommentBoxProps {
    }
    Commenter.CommentBoxProps = CommentBoxProps;
    class CommentBoxState {
        constructor(comments) {
            this.comments = comments;
        }
    }
    Commenter.CommentBoxState = CommentBoxState;
    class CommentBox extends React.Component {
        constructor(props) {
            super(props);
            this.state = new CommentBoxState([]);
        }
        loadCommentsFromServer() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: (data) => {
                    this.setState(new CommentBoxState(data));
                },
                error: (xhr, status, err) => {
                    console.error(this.props.url, status, err.toString());
                }
            });
        }
        handleCommentSubmit(comment) {
            var comments = this.state.comments;
            comment.id = Date.now().toString();
            var newComments = comments.concat([comment]);
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: function (data) {
                    this.setState({ data: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    this.state = new CommentBoxState(this.state.comments);
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        componentDidMount() {
            this.loadCommentsFromServer();
            setInterval(() => {
                console.log("polling");
                this.loadCommentsFromServer();
            }, this.props.pollInterval);
        }
        render() {
            return (React.createElement("div", {className: "commentBox"}, React.createElement("h1", null, "Hello ", this.props.myName), React.createElement(Commenter.CommentList, {listName: " comment list!", comments: this.state.comments}), React.createElement(Commenter.CommentForm, {formName: " comment form!", onCommentSubmit: this.handleCommentSubmit.bind(this)})));
        }
    }
    Commenter.CommentBox = CommentBox;
})(Commenter || (Commenter = {}));
var CommentBox = Commenter.CommentBox;
ReactDOM.render(React.createElement(CommentBox, {myName: "Ry's Big React Comment Thing", url: "/api/comments", pollInterval: 2000}), document.getElementById('content'));
