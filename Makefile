# Start the backend

.PHONY: all

init-servers:
	npm install --prefix ./backend
	npm install --prefix ./frontend

start-backend-dev:
	@echo "Starting backend"
	npm  --prefix ./backend run dev
	
start-backend:
	@echo "Starting backend"
	npm --prefix ./backend start

start-frontend:
	@echo "Starting frontend"
	npm --prefix ./frontend start
