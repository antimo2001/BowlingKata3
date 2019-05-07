# BowlingKata3

## "Why?"

- to practice babel, express, jwt and web tokens
- to practice supertest, chai-http, or some other E2E test library with express

## And secondary reasons are

- to practice web3 ...or mocking a web3 service layer
- to make RESTFUL API to calculate bowling scores (but this is a secondary purpose)

## Practice rebasing a branch

- Overview

In September 2016, GitHub introduced a new way to [merge pull requests](https://github.blog/2016-09-26-rebase-and-merge-pull-requests/): the “Rebase and merge” button.

### Why should I rebase a branch

- If you want to do a dev workflow to squash commits ...see [here](https://github.blog/2016-04-01-squash-your-commits/) for details

### When should I rebase

- Again, if you want to squash commits; see below quote from the github [blog post](https://github.blog/2016-04-01-squash-your-commits/)

> Commit squashing has the benefit of keeping your git history tidy and easier to digest than the alternative created by merge commits. While merge commits retain commits like “oops missed a spot” and “maybe fix that test? [round 2]”, squashing retains the changes but omits the individual commits from history. Many people prefer this workflow because, while those work-in-progress commits are helpful when working on a feature branch, they aren’t necessarily important to retain when looking at the history of your base branch. Here’s what squashing on merge looks like:

### How to rebase

- Follow the steps outlined in this github [blog post](https://github.blog/2016-04-01-squash-your-commits/)

> When you select the new “Rebase and merge” option, the commits from the pull request’s branch are rebased on to the tip of the base branch, and then the base branch itself is fast forwarded  to this newly rebased head. Rebases automatically set the committer of the rebased commits to the current user, while keeping authorship information intact. The pull request’s branch will not be modified by this operation.
