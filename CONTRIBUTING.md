# Contributing to Stepci
Welcome to Stepci's open-source community! We invite you to contribute by reporting bugs or suggesting improvements through issues or pull requests.

## Development setup

### Pre-requisite
- Node version >= v18
- npm   

### Development setup 
- Clone the project

    - via ssh: `git clone git@github.com:stepci/stepci.git` 

    - via https: `git clone https://github.com/stepci/stepci.git`

- Navigate to the project root and execute:  
  ```
  # install the dependencies of the project.
  npm i
  
  # build the project to get binary.
  npm run build

  ```

- To run the workflow 
    `npx stepci run example/<example-workflow.yml>`

### Run tests
    > To run the test we require a workflow file.  

  ```
  # We can get the default workflow file by intialising it.
  npx stepci init`
  npm run test
  ```


We appreciate your contributions to improving Stepci!
