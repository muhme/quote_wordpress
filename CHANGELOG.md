# Change Log

All notable changes to the WordPress plugin zitat-service will be documented in this file. Not documented are changes in the test and development environment.

The format is based on [Keep a Changelog](https://keepachangelog.com) and this project adheres to [Semantic Versioning](https://semver.org).

## [1.3.0] [Unreleased]

### Added
  * Replacing shortcode with block editor widget implementation
  * Added configuration for author, category and user
  * Language, author, category and user selectable by UI
  * Full translation to German, Spanish, Japanese and Ukrainian
  * Standard WordPress styling like text and background color, min height, typography size, padding, margin and spacing enabled
  * Quotes source styled with opacity 50%

### Changed
  * Development environment, tests, scripts and documentation extended
  * MIT license replaced by GPLv3 license

### Removed
  * Shortcode support

## [1.2.0] 2023-12-26

### Added
  * I18N for backend was added.

## [1.1.0] 2023-12-09

### Added
  * Shortcode parameter `language` was added.

## [1.0.0] 2023-11-29

First version, only implementing shortcode `[zitat_service]`. Limiting the selection of quotations from a language, from a category, from an author or by an entering user is not possible. The language used for the quote comes from WordPress user locale.
