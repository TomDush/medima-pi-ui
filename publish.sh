#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
RED='\033[1;31m'
GREEN='\033[1;32m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
GRAY='\033[0;37m'
YELLOW='\033[1;33m'
WHITE='\033[0;97m'
NC='\033[0m'

function print_help() {
	cat << EOF
Create a tarball to targeted directory and publish it on a S3 bucket.
Usage: publish.sh --dir <dir> --publish <s3 bucket>

Options:
	--help				print this help and exit
	--debug				activate debug logs
	--dir <dir>    			Directory to tarball and publish (default $TARGET)
	--publish <baz>			s3 url where tarball must be published. If not defined, just create the tarball
	--name <name>    		tarball final name
	--snapshot <dest>   Copy binary to a remote server using scp
EOF
}
# Args: message [color] [exit=-1]
function echoe() {
	MESS=$1
	if [[ $# -ge 2 ]] ; then
		MESS="${!2}$MESS$NC"
	fi
	echo -e $MESS

	if [[ $# -ge 3 ]] ; then
		exit $3
	fi
}
# Args: message
function debug() {
	if [[ $DEBUG -eq 1 ]] ; then
		echo -e "${CYAN}debug:$GRAY $1$NC"
	fi
}
# Args: message
function info() {
	echo -e "${BLUE}info:$WHITE $1$NC"
}

# Defaults
DEBUG=0
TARGET="$DIR/dist"
PUBLISH=""
SCP_DEST=""

# Parse options
while [[ $# -ge 1 ]]
do
	arg="$1"
	case $arg in
	--help|-h) print_help ; exit 0 ;;
	--debug) DEBUG=1 ;;

	--dir)
		TARGET=$2
		shift
		;;

	--publish)
		PUBLISH=$2
		shift
		;;

	--name)
		NAME=$2
		shift
		;;

	--snapshot)
	  SCP_DEST=$2
	  shift
	  ;;

	*)
    echoe "Argument not expected: $arg." RED
    print_help
    exit -1
		;;
	esac

	shift
done

if [[ -z $NAME ]] ; then
  echoe "ERROR: name is mandatory (--name <name>)" RED -1
fi

echoe "Publishing directory $TARGET to '$PUBLISH' and/or '$SCP_DEST'" YELLOW
TARBALL="$TARGET/$NAME.tar.gz"
CURRENT=`pwd`

debug "creating tarball $NAME"
rm -f "$TARBALL"
cd "$TARGET"
tar -czf "../$NAME" *

debug "moving tarball in directory $TARBALL"
cd $CURRENT
mv "$TARGET/../$NAME" "$TARBALL"

if [[ -z "$PUBLISH" && -z "$SCP_DEST" ]] ; then
  echoe "SUCCESS: tarball has created: $CYAN$TARBALL" GREEN

else
  if [[ "$SCP_DEST" != "" ]] ; then
    scp dist/medima-pi-ui.tar.gz $SCP_DEST
  fi

  if [[ "$PUBLISH" != "" ]] ; then
    debug "Publish tarball to $PUBLISH"
    aws s3 cp "$TARBALL" "$PUBLISH"
    echoe "SUCCESS: tarball has been deployed to $CYAN$PUBLISH" GREEN
  fi
fi
