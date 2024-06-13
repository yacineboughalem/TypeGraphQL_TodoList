import { Arg, Int, Query, Resolver, Mutation } from "type-graphql";
import { Task } from "../entities/task";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello frontYnova";
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find({});
  }


  // @Query(() => Task, { nullable: true })
  // task(
  //   @Arg("id", () => Int)
  //   id: number
  // ): Promise<Task | undefined> {
  //   return Task.findOne({ id })
  // }

  @Query(() => Task, { nullable: true })
  async task(
    @Arg("id", () => Int) id: number
  ): Promise<Task | undefined> {
    return await Task.findOne({ where: { id } });
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return Task.create({ title, isComplete: false }).save();
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      Task.delete({ id });
      return true;
    } catch {
      return false;
    }
  }


  @Mutation(() => Boolean, { nullable: true })
  updateTask(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Arg("isComplete", () => Boolean) isComplete: boolean

  ): boolean | null {
    const task = Task.findOne({ where: { id } })
    if (!task) return null;

    try {
      Task.update({ id }, { title, isComplete })
      return true;
    } catch { return false; }
  }

}