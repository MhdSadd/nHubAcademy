# Project / About

        This is the nAcademy site

# Folder structure

    - client
    - Config
    - Controllers
        - admin
        - auth
        - default
        - users
    - misc
    - models
    - routes
        - admin
        - auth
        - default
        - users
    - views
        - admin
        - auth
        - default
        - partials
        - users

# collaboration
    - Ishaya Sunday
    - Abdulrasheed Sadiq
    - Kwis Lawrence Francis
    

# colors

    - primary-colors rgb(241, 133, 51);
    - other-colors #0c0c0cb1

# Collaborating to multiple branches
    git checkout -b featured_branch_name
    git push -u origin featured_branch_name

    # View branches 
    git branch
    #both branches 
    git branch -a 
    #checkout a branch 
    git checkout BRANCH_NAME

    #Creating a new branch 
    git branch BRANCH_NAME

    #Two_step method 
    git branch BRANCH_NAME
    git checkout BRANCH_NAME

    #short cut
    git checkout -b NEW-BRANCH-NAME

    Rename a Branch

    To rename a branch, run the command:

    git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME

# Alternative
    git branch --move OLD-BRANCH-NAME NEW-BRANCH-NAME

    Delete a Branch

    Git won’t let you delete a branch that you’re currently on. You first need to checkout a different branch, then run the command:

    git branch -d BRANCH-TO-DELETE

# Alternative:
    git branch --delete BRANCH-TO-DELETE

    The branch that you switch to makes a difference. Git will throw an error if the changes in the branch you’re trying to delete are not fully merged into the current    branch. You can override this and force Git to delete the branch with the -D option (note the capital letter) or using the --force option with -d or --delete :

    git branch -D BRANCH-TO-DELETE

# Alternatives
    git branch -d --force BRANCH-TO-DELETE
    git branch --delete --force BRANCH-TO-DELETE

# Compare Branches

    You can compare branches with the git diff command:

    git diff FIRST-BRANCH..SECOND-BRANCH

    You’ll see colored output for the changes between branches. For all lines that have changed, the SECOND-BRANCH version will be a green line starting with a “+”, and the    FIRST-BRANCH version will be a red line starting with a “-”. If you don’t want Git to display two lines for each change, you can use the --color-words option. Instead, Git will show one line with deleted text in red, and added text in green.

    If you want to see a list of all the branches that are completely merged into your current branch (in other words, your current branch includes all the changes of the  other branches that are listed), run the command git branch --merged .
    Update a Branch from Remote

# To update a local branch from remote:

    git stash (optional, to save local changes which differs from the remote repository if any) 

## If you weren’t already on the branch you want to work on:

    git checkout my_local_branch 

# Finally pull from the remote branch

    git pull

# Track a Remote Branch

    If you already have a branch and you want to track a remote branch, then you use set-upstream-to command:

    git branch --set-upstream-to origin/BRANCH

    Or you can use the -u flag (upstream) when you make your first push:

    git push -u origin BRANCH

# Help with Git Branch

    If you forget how to use an option, or want to explore other functionality around the git branch command, you can run any of these commands:

    git help branch
    git branch --help
    man git-branch

# Merging via command line

    If you do not want to use the merge button or an automatic merge cannot be performed, you can perform a manual merge on the command line.

#### Step 1: From your project repository, bring in the changes and test.

    git fetch origin
    git checkout -b update origin/update
    git merge main

#### Step 2: Merge the changes and update on GitHub.

    git checkout main
    git merge --no-ff update
    git push origin main