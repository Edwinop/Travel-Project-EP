import {makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    '&:hover': { backgroundColor: '#EBEBEB' },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '55px',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
  },
  searchIcon: {
    padding: theme.spacing(0, 2), color: 'black',height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%',marginTop: 10, [theme.breakpoints.up('md')]: { width: '100ch' },
  },
  toolbar: {
    display: 'flex', flexDirection: "column", height: 500 
    
  },
}));