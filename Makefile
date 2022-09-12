# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jraffin <jraffin@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/03/10 14:54:46 by adelille          #+#    #+#              #
#    Updated: 2022/09/11 15:31:32 by jraffin          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME =	ft_transcendence

FRONT =	./frontend
BACK =	./backend

ENV =		.env
SECRETENV =	.front.env

# **************************************************************************** #
#	MAKEFILE	#

#include	srcs/.env
#export	$(shell sed 's/=.*//' srcs/.env)

#include $(ENV)
#$(eval export $(shell sed -ne 's/ *#.*$$//; /./ p' ./$(ENV)))
#-include $(SECRETENV)
#$(eval export $(shell sed -ne 's/ *#.*$$//; /./ s/=.*$$// p' $(SECRETENV)))

SHELL := bash

B =		$(shell tput bold)
RED =	$(shell tput setaf 1)
GRE =	$(shell tput setaf 2)
YEL =	$(shell tput setaf 3)
D =		$(shell tput sgr0)

# *************************************************************************** #
#	RULES	#

all:	$(NAME)

$(NAME):
	@[ -f $(SECRETENV) ] || echo -e "$(B)$(YEL)[WARNING]$(D)\t$(SECRETENV) not found"
	docker-compose up --force-recreate --build

ip:
	@hostname -I | cut -d' ' -f1

db:
	docker-compose run -p 5432:5432 db

back:
	[ -d $(BACK)/node_modules ] || npm --prefix $(BACK) install $(BACK) --legacy-peer-deps
	@export PORT=3000 DATABASE_HOST=localhost DATABASE_PORT=5432 $(shell sed -e 's/ *#.*$$//' ./$(ENV))	\
	&& npm --prefix $(BACK) run start:dev

front:
	[ -d $(FRONT)/node_modules ] || npm --prefix $(FRONT) install $(FRONT) --legacy-peer-deps
	@export PORT=3001 $(shell sed -e 's/ *#.*$$//' ./$(SECRETENV))	\
	&& npm --prefix $(FRONT) start

stop:
	killall -eqv -SIGINT node || exit 0
	docker-compose down

dev: stop
	xterm -e $(MAKE) back &
	xterm -e $(MAKE) front &
	xterm -e $(MAKE) db &

clean:	stop
	docker system prune --volumes -f

fclean: clean
	docker system prune -af

re:		clean all

fre:	fclean all

list:
	@printf "\n\t$(B)$(GRE)containers$(D)\n"
	@docker ps -a
	@printf "\n\t$(B)$(GRE)images$(D)\n"
	@docker images -a
	@printf "\n\t$(B)$(GRE)networks$(D)\n"
	@docker network ls
	@printf "\n\t$(B)$(GRE)volumes$(D)\n"
	@docker volume ls
	@echo ;

.PHONY: all ip db back front stop dev clean fclean re fre list

# **************************************************************************** #
