#!/bin/sh
docker run --name vote_system_vote --link="minioa-mongo:mongodb" vote_system_vote:1.0
