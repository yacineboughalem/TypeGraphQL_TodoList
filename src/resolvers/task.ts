import { Arg, Int, Query, Resolver, Mutation } from "type-graphql";
import { Task } from "../entities/task";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello frontYnova";
  }


  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return Task.create({ title, isComplete: false }).save();
  }
}