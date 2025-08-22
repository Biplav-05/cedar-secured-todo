CREATE TABLE `project` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255) NOT NULL,
	`active_status` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(500) NOT NULL,
	`task_status` enum('todo','pending','in_progress','completed') DEFAULT 'todo',
	`task_priority` enum('low','medium','high') DEFAULT 'low',
	`due_date` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(55) NOT NULL,
	`last_name` varchar(55) NOT NULL,
	`is_active` boolean DEFAULT true,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_unique_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `project` ADD CONSTRAINT `project_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_project_user_id` ON `project` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_task_projectId` ON `task` (`project_id`);--> statement-breakpoint
CREATE INDEX `idx_task_status` ON `task` (`task_status`);--> statement-breakpoint
CREATE INDEX `idx_task_priority` ON `task` (`task_priority`);