
/// <reference path="../../typings/tsd.d.ts" />

namespace Commenter
{
  export class CommentFormProps
  {
    public formName: string;
    public onCommentSubmit: Action<CommentDTO> ;
  }

  export class CommentFormState
  {
    public constructor(public author: string, public text: string)
    {

    }
  }

  export class CommentForm extends React.Component<CommentFormProps, CommentFormState>
  {
    constructor(props: CommentFormProps)
    {
      super(props);
      this.state = new CommentFormState("", "");
    }

    public handleAuthorChange(e)
    {
      //console.log(this);
      this.setState(new CommentFormState(e.target.value, this.state.text));
    }

    public handleTextChange(e)
    {
      console.log(e);
      this.setState(new CommentFormState(this.state.author, e.target.value));
    }

    public handleSubmit(e)
    {
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (!text || !author) {
        return;
      }
      this.props.onCommentSubmit(new CommentDTO(null, author, text));
      this.setState({author: '', text: ''});
    }

    public render(){
      return(
        <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
          <h1>Enter your comment!</h1>
          <input
            type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange.bind(this)}
          />
          <input
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange.bind(this)}
          />
          <input type="submit" value="Post" />
        </form>
      );
    }
  }

}
