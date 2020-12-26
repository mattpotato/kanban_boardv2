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
  createBoard: Board;
  createTaskList: TaskList;
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


export type MutationCreateTaskListArgs = {
  boardId: Scalars['Int'];
  name: Scalars['String'];
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
    & Pick<TaskList, 'id' | 'name' | 'boardId'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name' | 'pos'>
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
    tasks {
      id
      name
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