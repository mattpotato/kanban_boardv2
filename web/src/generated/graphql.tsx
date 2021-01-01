import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getBoardById: Board;
  getBoards: Array<Board>;
  getTaskLists: Array<TaskList>;
};


export type QueryGetBoardByIdArgs = {
  boardId: Scalars['Int'];
};


export type QueryGetTaskListsArgs = {
  boardId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['Int'];
  name: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  taskLists: TaskList;
  minPos: Scalars['Float'];
  maxPos: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type TaskList = {
  __typename?: 'TaskList';
  id: Scalars['Float'];
  name: Scalars['String'];
  boardId: Scalars['Float'];
  tasks: Array<Task>;
  minPos: Scalars['Float'];
  maxPos: Scalars['Float'];
  pos: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Float'];
  name: Scalars['String'];
  listId: Scalars['Float'];
  pos: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  register: UserResponse;
  logout: Scalars['Boolean'];
  createBoard: Board;
  changeBoardName: Board;
  createTaskList: TaskList;
  deleteTaskList: Scalars['Boolean'];
  renameTaskList: TaskList;
  moveTaskList: Scalars['Boolean'];
  createTask: Task;
  moveTask: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateBoardArgs = {
  boardName: Scalars['String'];
};


export type MutationChangeBoardNameArgs = {
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateTaskListArgs = {
  boardId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteTaskListArgs = {
  boardId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationRenameTaskListArgs = {
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationMoveTaskListArgs = {
  lastUpdated: Scalars['String'];
  boardId: Scalars['Int'];
  toPos: Scalars['Float'];
  id: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  boardId: Scalars['Int'];
  listId: Scalars['Int'];
  taskName: Scalars['String'];
};


export type MutationMoveTaskArgs = {
  lastUpdated: Scalars['String'];
  boardId: Scalars['Int'];
  toPos: Scalars['Float'];
  toListId: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  boardId: Scalars['Int'];
  listId: Scalars['Int'];
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewActivity: BoardActivity;
  onNewTaskList: TaskList;
};


export type SubscriptionOnNewActivityArgs = {
  boardId: Scalars['Int'];
};


export type SubscriptionOnNewTaskListArgs = {
  boardId: Scalars['Int'];
};

export type BoardActivity = {
  __typename?: 'BoardActivity';
  boardId: Scalars['Int'];
  message: Scalars['String'];
};

export type ChangeBoardNameMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type ChangeBoardNameMutation = (
  { __typename?: 'Mutation' }
  & { changeBoardName: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name'>
  ) }
);

export type CreateBoardMutationVariables = Exact<{
  boardName: Scalars['String'];
}>;


export type CreateBoardMutation = (
  { __typename?: 'Mutation' }
  & { createBoard: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name'>
  ) }
);

export type CreateTaskMutationVariables = Exact<{
  taskName: Scalars['String'];
  listId: Scalars['Int'];
  boardId: Scalars['Int'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'listId' | 'pos'>
  ) }
);

export type CreateTaskListMutationVariables = Exact<{
  boardId: Scalars['Int'];
  name: Scalars['String'];
}>;


export type CreateTaskListMutation = (
  { __typename?: 'Mutation' }
  & { createTaskList: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name' | 'boardId'>
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Int'];
  listId: Scalars['Int'];
  boardId: Scalars['Int'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type DeleteTaskListMutationVariables = Exact<{
  id: Scalars['Int'];
  boardId: Scalars['Int'];
}>;


export type DeleteTaskListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTaskList'>
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'createdAt' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MoveTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
  toListId: Scalars['Int'];
  toPos: Scalars['Float'];
  boardId: Scalars['Int'];
  lastUpdated: Scalars['String'];
}>;


export type MoveTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveTask'>
);

export type MoveTaskListMutationVariables = Exact<{
  id: Scalars['Int'];
  toPos: Scalars['Float'];
  boardId: Scalars['Int'];
  lastUpdated: Scalars['String'];
}>;


export type MoveTaskListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveTaskList'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'createdAt' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RenameTaskListMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type RenameTaskListMutation = (
  { __typename?: 'Mutation' }
  & { renameTaskList: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name'>
  ) }
);

export type GetBoardByIdQueryVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type GetBoardByIdQuery = (
  { __typename?: 'Query' }
  & { getBoardById: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name' | 'creatorId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = (
  { __typename?: 'Query' }
  & { getBoards: Array<(
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name' | 'creatorId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetTaskListsQueryVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type GetTaskListsQuery = (
  { __typename?: 'Query' }
  & { getTaskLists: Array<(
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name' | 'boardId' | 'pos'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name' | 'listId' | 'pos'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type OnNewActivitySubscriptionVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type OnNewActivitySubscription = (
  { __typename?: 'Subscription' }
  & { onNewActivity: (
    { __typename?: 'BoardActivity' }
    & Pick<BoardActivity, 'message'>
  ) }
);

export type OnNewTaskListSubscriptionVariables = Exact<{
  boardId: Scalars['Int'];
}>;


export type OnNewTaskListSubscription = (
  { __typename?: 'Subscription' }
  & { onNewTaskList: (
    { __typename?: 'TaskList' }
    & Pick<TaskList, 'id' | 'name' | 'boardId'>
  ) }
);


export const ChangeBoardNameDocument = gql`
    mutation changeBoardName($id: Int!, $name: String!) {
  changeBoardName(id: $id, name: $name) {
    id
    name
  }
}
    `;
export type ChangeBoardNameMutationFn = Apollo.MutationFunction<ChangeBoardNameMutation, ChangeBoardNameMutationVariables>;

/**
 * __useChangeBoardNameMutation__
 *
 * To run a mutation, you first call `useChangeBoardNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBoardNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBoardNameMutation, { data, loading, error }] = useChangeBoardNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useChangeBoardNameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBoardNameMutation, ChangeBoardNameMutationVariables>) {
        return Apollo.useMutation<ChangeBoardNameMutation, ChangeBoardNameMutationVariables>(ChangeBoardNameDocument, baseOptions);
      }
export type ChangeBoardNameMutationHookResult = ReturnType<typeof useChangeBoardNameMutation>;
export type ChangeBoardNameMutationResult = Apollo.MutationResult<ChangeBoardNameMutation>;
export type ChangeBoardNameMutationOptions = Apollo.BaseMutationOptions<ChangeBoardNameMutation, ChangeBoardNameMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($boardName: String!) {
  createBoard(boardName: $boardName) {
    id
    name
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      boardName: // value for 'boardName'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, baseOptions);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($taskName: String!, $listId: Int!, $boardId: Int!) {
  createTask(taskName: $taskName, listId: $listId, boardId: $boardId) {
    id
    name
    listId
    pos
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskName: // value for 'taskName'
 *      listId: // value for 'listId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateTaskListDocument = gql`
    mutation CreateTaskList($boardId: Int!, $name: String!) {
  createTaskList(boardId: $boardId, name: $name) {
    id
    name
    boardId
  }
}
    `;
export type CreateTaskListMutationFn = Apollo.MutationFunction<CreateTaskListMutation, CreateTaskListMutationVariables>;

/**
 * __useCreateTaskListMutation__
 *
 * To run a mutation, you first call `useCreateTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskListMutation, { data, loading, error }] = useCreateTaskListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTaskListMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskListMutation, CreateTaskListMutationVariables>) {
        return Apollo.useMutation<CreateTaskListMutation, CreateTaskListMutationVariables>(CreateTaskListDocument, baseOptions);
      }
export type CreateTaskListMutationHookResult = ReturnType<typeof useCreateTaskListMutation>;
export type CreateTaskListMutationResult = Apollo.MutationResult<CreateTaskListMutation>;
export type CreateTaskListMutationOptions = Apollo.BaseMutationOptions<CreateTaskListMutation, CreateTaskListMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: Int!, $listId: Int!, $boardId: Int!) {
  deleteTask(id: $id, listId: $listId, boardId: $boardId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      listId: // value for 'listId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeleteTaskListDocument = gql`
    mutation DeleteTaskList($id: Int!, $boardId: Int!) {
  deleteTaskList(id: $id, boardId: $boardId)
}
    `;
export type DeleteTaskListMutationFn = Apollo.MutationFunction<DeleteTaskListMutation, DeleteTaskListMutationVariables>;

/**
 * __useDeleteTaskListMutation__
 *
 * To run a mutation, you first call `useDeleteTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskListMutation, { data, loading, error }] = useDeleteTaskListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteTaskListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskListMutation, DeleteTaskListMutationVariables>) {
        return Apollo.useMutation<DeleteTaskListMutation, DeleteTaskListMutationVariables>(DeleteTaskListDocument, baseOptions);
      }
export type DeleteTaskListMutationHookResult = ReturnType<typeof useDeleteTaskListMutation>;
export type DeleteTaskListMutationResult = Apollo.MutationResult<DeleteTaskListMutation>;
export type DeleteTaskListMutationOptions = Apollo.BaseMutationOptions<DeleteTaskListMutation, DeleteTaskListMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    user {
      email
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MoveTaskDocument = gql`
    mutation MoveTask($taskId: Int!, $toListId: Int!, $toPos: Float!, $boardId: Int!, $lastUpdated: String!) {
  moveTask(
    taskId: $taskId
    toListId: $toListId
    toPos: $toPos
    boardId: $boardId
    lastUpdated: $lastUpdated
  )
}
    `;
export type MoveTaskMutationFn = Apollo.MutationFunction<MoveTaskMutation, MoveTaskMutationVariables>;

/**
 * __useMoveTaskMutation__
 *
 * To run a mutation, you first call `useMoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTaskMutation, { data, loading, error }] = useMoveTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      toListId: // value for 'toListId'
 *      toPos: // value for 'toPos'
 *      boardId: // value for 'boardId'
 *      lastUpdated: // value for 'lastUpdated'
 *   },
 * });
 */
export function useMoveTaskMutation(baseOptions?: Apollo.MutationHookOptions<MoveTaskMutation, MoveTaskMutationVariables>) {
        return Apollo.useMutation<MoveTaskMutation, MoveTaskMutationVariables>(MoveTaskDocument, baseOptions);
      }
export type MoveTaskMutationHookResult = ReturnType<typeof useMoveTaskMutation>;
export type MoveTaskMutationResult = Apollo.MutationResult<MoveTaskMutation>;
export type MoveTaskMutationOptions = Apollo.BaseMutationOptions<MoveTaskMutation, MoveTaskMutationVariables>;
export const MoveTaskListDocument = gql`
    mutation MoveTaskList($id: Int!, $toPos: Float!, $boardId: Int!, $lastUpdated: String!) {
  moveTaskList(
    id: $id
    toPos: $toPos
    boardId: $boardId
    lastUpdated: $lastUpdated
  )
}
    `;
export type MoveTaskListMutationFn = Apollo.MutationFunction<MoveTaskListMutation, MoveTaskListMutationVariables>;

/**
 * __useMoveTaskListMutation__
 *
 * To run a mutation, you first call `useMoveTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTaskListMutation, { data, loading, error }] = useMoveTaskListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      toPos: // value for 'toPos'
 *      boardId: // value for 'boardId'
 *      lastUpdated: // value for 'lastUpdated'
 *   },
 * });
 */
export function useMoveTaskListMutation(baseOptions?: Apollo.MutationHookOptions<MoveTaskListMutation, MoveTaskListMutationVariables>) {
        return Apollo.useMutation<MoveTaskListMutation, MoveTaskListMutationVariables>(MoveTaskListDocument, baseOptions);
      }
export type MoveTaskListMutationHookResult = ReturnType<typeof useMoveTaskListMutation>;
export type MoveTaskListMutationResult = Apollo.MutationResult<MoveTaskListMutation>;
export type MoveTaskListMutationOptions = Apollo.BaseMutationOptions<MoveTaskListMutation, MoveTaskListMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    user {
      email
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RenameTaskListDocument = gql`
    mutation RenameTaskList($id: Int!, $name: String!) {
  renameTaskList(id: $id, name: $name) {
    id
    name
  }
}
    `;
export type RenameTaskListMutationFn = Apollo.MutationFunction<RenameTaskListMutation, RenameTaskListMutationVariables>;

/**
 * __useRenameTaskListMutation__
 *
 * To run a mutation, you first call `useRenameTaskListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTaskListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTaskListMutation, { data, loading, error }] = useRenameTaskListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameTaskListMutation(baseOptions?: Apollo.MutationHookOptions<RenameTaskListMutation, RenameTaskListMutationVariables>) {
        return Apollo.useMutation<RenameTaskListMutation, RenameTaskListMutationVariables>(RenameTaskListDocument, baseOptions);
      }
export type RenameTaskListMutationHookResult = ReturnType<typeof useRenameTaskListMutation>;
export type RenameTaskListMutationResult = Apollo.MutationResult<RenameTaskListMutation>;
export type RenameTaskListMutationOptions = Apollo.BaseMutationOptions<RenameTaskListMutation, RenameTaskListMutationVariables>;
export const GetBoardByIdDocument = gql`
    query GetBoardById($boardId: Int!) {
  getBoardById(boardId: $boardId) {
    id
    name
    creatorId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBoardByIdQuery__
 *
 * To run a query within a React component, call `useGetBoardByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardByIdQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
        return Apollo.useQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, baseOptions);
      }
export function useGetBoardByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, baseOptions);
        }
export type GetBoardByIdQueryHookResult = ReturnType<typeof useGetBoardByIdQuery>;
export type GetBoardByIdLazyQueryHookResult = ReturnType<typeof useGetBoardByIdLazyQuery>;
export type GetBoardByIdQueryResult = Apollo.QueryResult<GetBoardByIdQuery, GetBoardByIdQueryVariables>;
export const GetBoardsDocument = gql`
    query GetBoards {
  getBoards {
    id
    name
    creatorId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, baseOptions);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, baseOptions);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const GetTaskListsDocument = gql`
    query getTaskLists($boardId: Int!) {
  getTaskLists(boardId: $boardId) {
    id
    name
    boardId
    pos
    tasks {
      id
      name
      listId
      pos
    }
  }
}
    `;

/**
 * __useGetTaskListsQuery__
 *
 * To run a query within a React component, call `useGetTaskListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskListsQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetTaskListsQuery(baseOptions: Apollo.QueryHookOptions<GetTaskListsQuery, GetTaskListsQueryVariables>) {
        return Apollo.useQuery<GetTaskListsQuery, GetTaskListsQueryVariables>(GetTaskListsDocument, baseOptions);
      }
export function useGetTaskListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskListsQuery, GetTaskListsQueryVariables>) {
          return Apollo.useLazyQuery<GetTaskListsQuery, GetTaskListsQueryVariables>(GetTaskListsDocument, baseOptions);
        }
export type GetTaskListsQueryHookResult = ReturnType<typeof useGetTaskListsQuery>;
export type GetTaskListsLazyQueryHookResult = ReturnType<typeof useGetTaskListsLazyQuery>;
export type GetTaskListsQueryResult = Apollo.QueryResult<GetTaskListsQuery, GetTaskListsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OnNewActivityDocument = gql`
    subscription OnNewActivity($boardId: Int!) {
  onNewActivity(boardId: $boardId) {
    message
  }
}
    `;

/**
 * __useOnNewActivitySubscription__
 *
 * To run a query within a React component, call `useOnNewActivitySubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewActivitySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewActivitySubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useOnNewActivitySubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewActivitySubscription, OnNewActivitySubscriptionVariables>) {
        return Apollo.useSubscription<OnNewActivitySubscription, OnNewActivitySubscriptionVariables>(OnNewActivityDocument, baseOptions);
      }
export type OnNewActivitySubscriptionHookResult = ReturnType<typeof useOnNewActivitySubscription>;
export type OnNewActivitySubscriptionResult = Apollo.SubscriptionResult<OnNewActivitySubscription>;
export const OnNewTaskListDocument = gql`
    subscription OnNewTaskList($boardId: Int!) {
  onNewTaskList(boardId: $boardId) {
    id
    name
    boardId
  }
}
    `;

/**
 * __useOnNewTaskListSubscription__
 *
 * To run a query within a React component, call `useOnNewTaskListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewTaskListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewTaskListSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useOnNewTaskListSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewTaskListSubscription, OnNewTaskListSubscriptionVariables>) {
        return Apollo.useSubscription<OnNewTaskListSubscription, OnNewTaskListSubscriptionVariables>(OnNewTaskListDocument, baseOptions);
      }
export type OnNewTaskListSubscriptionHookResult = ReturnType<typeof useOnNewTaskListSubscription>;
export type OnNewTaskListSubscriptionResult = Apollo.SubscriptionResult<OnNewTaskListSubscription>;