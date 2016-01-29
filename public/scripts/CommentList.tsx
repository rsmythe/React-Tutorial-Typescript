/// <reference path="../../typings/tsd.d.ts" />

namespace Commenter
{
  export class CommentListProps
  {
    public listName: string;
    public comments: CommentDTO[];
  }

  export class CommentListState
  {
    public constructor(public comments: CommentDTO[])
    {

    }
  }

  export class CommentList extends React.Component<CommentListProps, CommentListState>
  {
    constructor(props: CommentListProps)
    {
      super(props);
    }

    public render()
    {
      var commentNodes = this.props.comments.map( (comment: CommentDTO) =>
      {
        return (
          <Comment author={comment.author} key={comment.id} children="">
            {comment.text}
          </Comment>
        );
      });
      return(
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  }

}
