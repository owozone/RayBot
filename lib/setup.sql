CREATE TABLE IF NOT EXISTS `analytics` (
    `guild` VARCHAR(10) NOT NULL,
    `messagesSent` BIGINT NOT NULL,
    `messagesDeleted` BIGINT NOT NULL,
    `userJoins` BIGINT NOT NULL,
    `userLeaves` BIGINT NOT NULL,
    `nitroBoosts` BIGINT NOT NULL,
    PRIMARY KEY (`guild`))