
/// <reference path="../../typings/tsd.d.ts" />

namespace Commenter
{

  export class CommentDTO
  {
    public constructor(public id: string, public author: string, public text: string)
    {

    }
  }

  export class CommentProps
  {
    public author: string;
    public key: string;
    public children: string;
  }

  export class CommentState
  {
    public isGood: boolean
  }

  export class Comment extends React.Component<CommentProps, CommentState>
  {
    constructor(props: CommentProps)
    {
      super(props);
    }

    public rawMarkup()
    {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
      return { __html: rawMarkup };
    }

    public render(){
      return(
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
  }

}
