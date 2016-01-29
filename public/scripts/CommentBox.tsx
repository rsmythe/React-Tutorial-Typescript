/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="CommentList.tsx" />
/// <reference path="CommentForm.tsx" />

var CommentList = Commenter.CommentList;

namespace Commenter
{
  export class CommentBoxProps
  {
    public myName: string;
    public url: string;
    public pollInterval: number;
  }

  export class CommentBoxState
  {
    public constructor(public comments: CommentDTO[])
    {

    }
  }

  export class CommentBox extends React.Component<CommentBoxProps, CommentBoxState>
  {
    public constructor(props: CommentBoxProps)
    {
      super(props);
      this.state = new CommentBoxState([]);
    }

    public loadCommentsFromServer()
    {
      $.ajax(
      {
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: (data: CommentDTO[]) =>
        {
          this.setState(new CommentBoxState(data));
        },
        error: (xhr, status, err) =>
        {
          console.error(this.props.url, status, err.toString());
        }
      });
    }

    public handleCommentSubmit(comment: CommentDTO)
    {
      var comments = this.state.comments;
      comment.id = Date.now().toString();
      var newComments = comments.concat([comment]);

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.state = new CommentBoxState(this.state.comments);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

    public componentDidMount()
    {
      this.loadCommentsFromServer();
      setInterval(() => {
        console.log("polling");
        this.loadCommentsFromServer();
      }, this.props.pollInterval)
    }

    public render() : React.ReactElement<CommentBox>{
      return (
        <div className="commentBox">
          <h1>Hello {this.props.myName}</h1>
          <CommentList listName=" comment list!" comments={this.state.comments}/>
          <CommentForm formName=" comment form!" onCommentSubmit={this.handleCommentSubmit.bind(this)} />
        </div>
      );
    }
  }
}

var CommentBox = Commenter.CommentBox;

// var data: Commenter.CommentDTO[] = [
//   new Commenter.CommentDTO(1,"Pete Hunt","This is one comment"),
//   new Commenter.CommentDTO(2, "Jordan Walke", "This is *another* comment")
// ];

ReactDOM.render(
  //<CommentBox myName="Ry's Big React Comment Thing" comments={data}/>,
  <CommentBox myName="Ry's Big React Comment Thing" url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
