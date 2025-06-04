// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract TaskManager {
    event TaskCreated(
        uint256 id,
        uint256 createdAt,
        uint256 dueDate,
        string title,
        string description,
        bool isCompleted,
        address owner
    );

    struct Task {
        uint256 id;
        uint256 createdAt;
        uint256 completedAt;
        uint256 dueDate;
        string title;
        string description;
        bool isCompleted;
        address owner;
    }

    Task[] public tasks;

    function createTask(string memory _title, string memory _description, uint256 _dueDate) public {
        Task memory task = Task({
          completedAt: 0, 
          createdAt: block.timestamp,
          dueDate: _dueDate,
          title: _title,
          description: _description,
          isCompleted: false,
          owner: msg.sender,
          id: tasks.length
        });

        tasks.push(task);

        emit TaskCreated(task.id, task.createdAt, task.dueDate, task.title, task.description, task.isCompleted, task.owner);
    }

    error Unauthorized();
    error AlreadyCompleted();

    function completeTask(uint256 _id) public {
        require(_id < tasks.length, "Task does not exist");

        Task storage task = tasks[_id];

        if (task.owner != msg.sender) {
            revert Unauthorized();
        }

        if (task.isCompleted == true) {
            revert AlreadyCompleted();
        }

        tasks[_id].isCompleted = true;
        tasks[_id].completedAt = block.timestamp;
    }

    function getTask(uint256 _id) public view returns (Task memory) {
        require(_id < tasks.length, "Task does not exist");
        return (tasks[_id]);
    }
}