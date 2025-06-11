import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { PostAttribute } from "./PostAttribute";

@Index("IX_AttributeId", ["attributeId"], {})
@Index("IX_PostId", ["postId"], {})
@Index("PK__PostAttr__3EA9B2064FAF55D5", ["postId", "attributeId"], {
  unique: true,
})
@Entity("PostAttribute_Post", { schema: "dbo" })
export class PostAttributePost {
  @Column("int", { primary: true, name: "Post_Id" })
  postId: number;

  @Column("int", { primary: true, name: "Attribute_Id" })
  attributeId: number;

  @Column("bit", { name: "ShowinDetail", default: () => "(0)" })
  showinDetail: boolean;

  @Column("bit", { name: "UseasVariation", default: () => "(0)" })
  useasVariation: boolean;

  @ManyToOne(() => Post, (post) => post.postAttributePosts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Post_Id", referencedColumnName: "id" }])
  post: Post;

  @ManyToOne(
    () => PostAttribute,
    (postAttribute) => postAttribute.postAttributePosts,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Attribute_Id", referencedColumnName: "id" }])
  attribute: PostAttribute;
}
