// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TaskManager} from "../src/TaskManager.sol";

contract TaskManagerTest is Test {
    TaskManager public taskManager;

    function setUp() public {
        taskManager = new TaskManager();
    }

    function test_CreateTask() public {
        address owner = address(0x123);
        vm.label(owner, "ownwer");

        vm.prank(owner);
        vm.expectEmit();
        emit TaskManager.TaskCreated(
            0, // id
            block.timestamp, // createdAt
            17171234567, // dueDate (not set yet)
            "Test Task", // title
            "This is a test task", // description
            false, // isCompleted
            owner // owner
        );

        taskManager.createTask(
            "Test Task",
            "This is a test task",
            17171234567 // dueDate
        );

        TaskManager.Task memory task = taskManager.getTask(0);
        
        assertEq(task.title, "Test Task");
        assertEq(task.description, "This is a test task");
        assertEq(task.dueDate, 17171234567);
        assertEq(task.createdAt, block.timestamp);        
        assertEq(task.completedAt, 0);
        assertEq(task.isCompleted, false);
        assertEq(task.owner, owner);
        assertEq(task.id, 0);
    }

    function test_CompleteTask() public {
        address owner = address(0x123);
        vm.label(owner, "owner");

        vm.prank(owner);
        taskManager.createTask("Test Task", "This is a test task", block.timestamp);

        vm.prank(owner);
        taskManager.completeTask(0);

        TaskManager.Task memory task = taskManager.getTask(0);
        
        assertEq(task.isCompleted, true);
    }

    function test_CompleteTaskRevertsIfAlreadyCompleted() public {
        address owner = address(0x123);
        vm.label(owner, "owner");

        vm.prank(owner);
        taskManager.createTask("Test Task", "This is a test task", block.timestamp);

        vm.prank(owner);
        taskManager.completeTask(0);

        vm.expectRevert(TaskManager.AlreadyCompleted.selector);
        vm.prank(owner);
        taskManager.completeTask(0);
    }
}
